import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import getSentiment from '../../api/sentiment';
import { getTweetsByName } from '../../api/twitter';
import getLocations, { addressLookup } from '../../api/location';

export default async (ctx) => {
    const { name } = ctx.params;

    if (!name) ctx.throw(new ParamMissingError('name'));

    // const locations = await getLocations(lat, lon);

    const tweets = await getTweetsByName(name);
    const tweetsText = tweets.statuses.map(tweet => tweet.text);



    if (!tweetsText) {
        ctx.throw(new ResourceNotFoundError(electionId));
    }

    ctx.body = tweetsText;
};
