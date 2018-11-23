import Twitter from 'twitter';
import secretKeys from '../__key'

const twitter = new Twitter(secretKeys.twitter);

export default (lat, lon, isASQ) => {
    const distance = isASQ ? .3 : 1;

    var params = {
        q: 'coffee OR cafe OR tea AND -filter:retweets AND -filter:replies',
        geocode: `${lat},${lon},${distance}km`,
        count: 10,
        result_type: 'mixed',
        tweet_mode: 'extended',
        lang: 'en'
    };

    return new Promise((resolve, reject) => {
        twitter.get('search/tweets', params, (error, data) => {
            if(error) reject(error);
            else resolve(data);
        });
    });
}

export const getTweetsByName = (name) => {
    var params = {
        q: `@${name} AND -filter:retweets AND -filter:replies`,
        count: 10,
        result_type: 'mixed',
        tweet_mode: 'extended',
        lang: 'en'
    };

    return new Promise((resolve, reject) => {
        twitter.get('search/tweets', params, (error, data) => {
            if(error) reject(error);
            else resolve(data);
        });
    });
}
