import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import AWS from 'aws-sdk';

export default async (ctx) => {
    const { electionId } = ctx.params;
    const { areaCode } = ctx.query;

    if (!electionId) ctx.throw(new ParamMissingError('electionId'));
    if (!areaCode) ctx.throw(new ParamMissingError('areaCode'));

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


    const res = {
        hello: 'world'
    };

    if (!res) {
        ctx.throw(new ResourceNotFoundError(electionId));
    }

    ctx.body = res;
};
