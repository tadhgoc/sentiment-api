import Twitter from 'twitter';
import secretKeys from '../__key'

const twitter = new Twitter(secretKeys.twitter);

export default (lat, lon) => {
    var params = {
        q: 'coffee OR cafe OR tea',
        geocode: `${lat},${lon},1km`,
        count: 10,
        result_type: 'recent',
        lang: 'en'
    };

    return new Promise((resolve, reject) => {
        twitter.get('search/tweets', params, (error, data) => {
            if(error) reject(error);
            else resolve(data);
        });
    });
}
