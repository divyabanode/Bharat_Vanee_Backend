const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials
});
async function uploadImageToS3(bucketName, key, imageBuffer) {
    const params = {
        Bucket: bucketName,
        Key: `${uuidv4()}${key}`,
        Body: imageBuffer,
        ACL: 'public-read',
    };
    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        const imagePath = `https://${bucketName}.s3.amazonaws.com/${params.Key}`
        return imagePath;
    } catch (err) {
        console.error('Error uploading image:', err);
    }
};
const deleteImagesService = async (payload) => {
    try {
        if (payload.body.imageName) {
            let key = payload.body.imageName.replace('https://propertyjinni.s3.amazonaws.com/', '')
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: key
            };
            const command = new DeleteObjectCommand(params);
            let data = await s3.send(command);
            return data;

        }
    }
    catch (error) {
        return {
            data: null,
            message: 'Wrong properties!',
            status: false
        }
    }
}
module.exports = {
    deleteImagesService,
    uploadImageToS3
}
