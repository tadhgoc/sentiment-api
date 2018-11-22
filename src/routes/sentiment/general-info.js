import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import AWS from 'aws-sdk';
import Twitter from 'twitter';
import twitterConfig from './__key'

const sentiment = () => {
    var params = {
        LanguageCode: 'en',
        TextList: [ /* required */
        'this is great',
        'super impressed',
        'would recommend',
        'not a fan'
        ]
    };
    var comprehend = new AWS.Comprehend({
        region: 'ap-southeast-2'
    });
    comprehend.batchDetectSentiment(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(JSON.stringify(data));           // successful response
    });
}

const twitter = () => {
    var params = {
        q: 'coffee OR cafe OR tea',
        geocode: '-33.87055808,151.20717287,0.5km',
        count: 10,
        result_type: 'recent',
        lang: 'en'
    };

    var twitter = new Twitter(twitterConfig);
    twitter.get('search/tweets', params, function(error, tweets, response) {
        if(error) console.log(error, error.stack); // an error occurred
        else     console.log(JSON.stringify(tweets));           // successful response

      });
}

export default async (ctx) => {
    const { electionId } = ctx.params;
    const { areaCode } = ctx.query;

    if (!electionId) ctx.throw(new ParamMissingError('electionId'));
    if (!areaCode) ctx.throw(new ParamMissingError('areaCode'));


    twitter();

    sentiment();



    const res = {
        hello: 'world'
    };

    if (!res) {
        ctx.throw(new ResourceNotFoundError(electionId));
    }

    ctx.body = res;
};
