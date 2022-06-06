const fs = require("fs");
const { s3, bucketName } = require("./s3");

async function upload(file, folder) {
    // TODO: Can add validation of the name of the file, to avoid so nasty things
    let mimeType = file.mimetype;

    const fullPath = `${bucketName}/${folder ?? ""}`;
    const params = {
        Bucket: fullPath,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: mimeType,
    };

    try {
        await promiseUpload(params);
    } catch (err) {
        console.error(err);

        return "";
    }

    const fileKey =
        fullPath.replace(bucketName + "/", "") + `/${file.originalname}`;

    return fileKey;
}

function promiseUpload(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = { upload };
