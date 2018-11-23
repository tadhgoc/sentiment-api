import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import getSentiment from '../../api/sentiment';
import getTweets from '../../api/twitter';
import getLocations, { addressLookup } from '../../api/location';

export default async (ctx) => {
    let { lat, lon, address } = ctx.query;

    if (!address) {
        if (!lat) ctx.throw(new ParamMissingError('lat'));
        if (!lon) ctx.throw(new ParamMissingError('lon'));
    } else {
        const addressDetails = await addressLookup(address);
        lat = addressDetails.lat;
        lon = addressDetails.lon;
    }

    const locations = await getLocations(lat, lon);

    const result = await Promise.all(locations.map(async location => {
        const tweets = await getTweets(location.position.lat, location.position.lon);
        const tweetsText = tweets.statuses.map(tweet => tweet.full_text);

        if (tweetsText.length > 0) {
            const sentiments = (await getSentiment(tweetsText)).ResultList;

            const sentimentScore = sentiments.reduce(
                (total, { SentimentScore: current }) =>
                    total + current.Positive - current.Negative
                , 0);

            const adjustedSentimentScore = sentimentScore / sentiments.length;
            const starScore = Math.round(adjustedSentimentScore*25) / 2;

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
};
