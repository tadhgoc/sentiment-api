import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import getSentiment from '../../api/sentiment';
import { getTweetsByName } from '../../api/twitter';
import getLocations, { addressLookup } from '../../api/location';

export default async (ctx) => {
    const { name } = ctx.params;

    if (!name) ctx.throw(new ParamMissingError('name'));

    const tweets = await getTweetsByName(name);
    const tweetsText = tweets.statuses.map(tweet => tweet.full_text);

    let result;
    if (tweetsText.length > 0) {
        let userName = name;
        try {
            userName = tweets.statuses[0].entities.user_mentions.filter(n => n.screen_name === name)[0]
        } catch(err) {
            // swallow;
        }

        const sentiments = (await getSentiment(tweetsText)).ResultList;

        const sentimentScore = sentiments.reduce(
            (total, { SentimentScore: current }) =>
                total + current.Positive - current.Negative
            , 0);

        const adjustedSentimentScore = sentimentScore / sentiments.length;
        const starScore = Math.round(adjustedSentimentScore*25) / 2;

        result = {
            poi: {
                name: userName.name
            },
            sentiment: adjustedSentimentScore,
            starScore: starScore > 5 ? 5 : starScore < 0 ? 0 : starScore
        }
    } else {
        result = {
            poi: {
                name
            },
            sentiment: 0,
            starScore: 0
        }
    }

    if (!result) {
        ctx.throw(new ResourceNotFoundError(electionId));
    }

    ctx.body = await result;
};
