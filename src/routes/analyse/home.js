import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import sentiment from '../../api/sentiment';
import twitter from '../../api/twitter';
import location from '../../api/location';

export default async (ctx) => {
    const { lat, lon } = ctx.query;

    if (!lat) ctx.throw(new ParamMissingError('lat'));
    if (!lon) ctx.throw(new ParamMissingError('lon'));

    const locations = await location(lat, lon);

    const result = await Promise.all(locations.map(async location => {
        const tweets = await twitter(location.position.lat, location.position.lon);
        const tweetsText = tweets.statuses.map(tweet => tweet.text);

        const sentimentResult = await sentiment(tweetsText);

        return {
            ...location,
            sentiment: sentimentResult.ResultList[0].Sentiment
        }
    }));

    if (!result) {
        ctx.throw(new ResourceNotFoundError(electionId));
    }

    ctx.body = await result;
};
