import Twitter from 'twitter';
import secretKeys from '../__key'

const twitter = new Twitter(secretKeys.twitter);

export default (lat, lon) => {
    const distance = 1;
    if (lat == -33.864620) distance = .2;

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
    const search = name.startsWith('@') ? name : `@${name}`;
    var params = {
        q: `${search} AND -filter:retweets AND -filter:replies`,
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
