import AWS from 'aws-sdk';

const comprehend = new AWS.Comprehend({
    region: 'ap-southeast-2'
});

export default (tweets) => {
    var params = {
        LanguageCode: 'en',
        TextList: tweets
    };

    return new Promise((resolve, reject) => {
        comprehend.batchDetectSentiment(params, (error, data) => {
            if(error) reject(error);
            else resolve(data);
        });
    });
}
