const { s3, bucketName } = require("./s3");

function download(fileKey, res) {
    const options = {
        Bucket: bucketName,
        Key: fileKey,
    };

    res.attachment(fileKey);
    let fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
}

module.exports = { download };
