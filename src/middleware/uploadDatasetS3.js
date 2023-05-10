import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'node:path';

import { s3 } from '../services/aws/s3Client.js';

const datasetBucket = process.env.S3_DATASET_BUCKET;

const s3Storage = multerS3({
    s3: s3, // s3 instance
    bucket: datasetBucket, // change it as per your project requirement
    acl: 'public-read', // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
        const fileName =
            Date.now() + '_' + file.fieldname + '_' + file.originalname;
        cb(null, fileName);
    },
});

function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = ['.json', '.csv'];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase()),
    );

    if (isAllowedExt) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!');
    }
}

export const uploadeDatasetS3 = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback);
    },
    limits: {
        fileSize: 1024 * 1024 * 20, // 20mb file size
    },
});
