import * as dotenv from 'dotenv';
dotenv.config();
import { uploadToS3 } from './s3Client.js';

const imageBucket = process.env.S3_IMAGE_BUCKET;

export const saveImageS3 = async (filename, fileblob) => {
    return uploadToS3(imageBucket, filename, fileblob, 'image/png');
};
