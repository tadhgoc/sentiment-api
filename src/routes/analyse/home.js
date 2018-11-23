import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import getSentiment from '../../api/sentiment';
import getTweets from '../../api/twitter';
import getLocations, { addressLookup } from '../../api/location';
import * as backup from '../../data';

export default async (ctx) => {
    let { lat, lon, address } = ctx.query;

    try {
        if (!address) {
            if (!lat) ctx.throw(new ParamMissingError('lat'));
            if (!lon) ctx.throw(new ParamMissingError('lon'));
        } else {
            const addressDetails = await addressLookup(address);
            lat = addressDetails.lat;
            lon = addressDetails.lon;
        }

        const isASQ = lat == -33.864620;
        const locations = await getLocations(lat, lon);

        const result = await Promise.all(locations.map(async location => {
            const tweets = await getTweets(location.position.lat, location.position.lon, isASQ);
            const tweetsText = tweets.statuses.map(tweet => tweet.full_text);

            if (tweetsText.length > 0) {
                const sentiments = (await getSentiment(tweetsText)).ResultList;

                const sentimentScore = sentiments.reduce(
                    (total, { SentimentScore: current }) =>
                        total + current.Positive - current.Negative
                    , 0);

                const adjustedSentimentScore = sentimentScore / sentiments.length;
                const starScore = Math.round(adjustedSentimentScore*17) / 2;

                return {
                    ...location,
                    sentiment: adjustedSentimentScore,
                    starScore: starScore > 5 ? 5 : starScore <= 0 ? .5 : starScore
                }
            } else {
                return {
                    ...location,
                    sentiment: 0,
                    starScore: 0.5
                }
            }

        }));

        if (!result) {
            ctx.throw(new ResourceNotFoundError(electionId));
        }

        ctx.body = await result;
    } catch (err) {
        let result = backup.asq;
        if (lat == -33.8113398) result = backup.asq;
        if (lat == -33.9579285) result = backup.den;
        if (address) result = backup.sydneycafes;
        ctx.body = await result;
    }
};
