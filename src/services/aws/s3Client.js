import * as dotenv from 'dotenv';
dotenv.config();
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { logger } from '../loggingService.js';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.S3_REGION;

export const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region: awsRegion,
});

export const uploadToS3 = async (bucket, filename, fileblob, contentType) => {
    try {
        const parallelUploads3 = new Upload({
            client: s3,
            params: {
                Bucket: bucket,
                Key: filename,
                Body: fileblob,
                ContentType: contentType,
            },
            queueSize: 4, // optional concurrency configuration
            partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
            leavePartsOnError: false, // optional manually handle dropped parts
        });

        parallelUploads3.on('httpUploadProgress', progress => {
            logger.info('[S3 Uploade] - [Progress]: ' + progress);
        });

        const uploadedFile = await parallelUploads3.done();
        logger.info(
            `[S3 Uploade] - [UploadFile]: ${JSON.stringify(uploadedFile)}`,
        );
        return {
            ok: true,
            url: uploadedFile.url,
        };
    } catch (e) {
        logger.error('[S3 Uploade]: ' + e);
        return {
            ok: false,
            url: null,
        };
    }
};
