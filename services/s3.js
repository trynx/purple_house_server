const AWS = require("aws-sdk");
// TODO: Change as needed for env - dotenv
// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

const bucketName = "purple.house.ta";
const region = "eu-central-1";
const accessKeyId = "AKIAXSPLDJVC36ZLLUBO";
const secretAccessKey = "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";

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});

module.exports = {
    s3,
    bucketName,
};
