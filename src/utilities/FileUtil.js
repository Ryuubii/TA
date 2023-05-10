import path from 'path';
import { access, constants, writeFile, unlink } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

export function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /json|csv/;
    // Check ext
    const extname = filetypes.test(
        getFileExtension(file.originalname).toLowerCase(),
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: CSV or JSON only!');
    }
}

function getFileExtension(filename) {
    filename = filename.split('.');
    return filename[filename.length - 1];
}

export function checkFileCSV(file) {
    // Allowed ext
    const filetypes = /csv/;
    // Check ext
    const extname = filetypes.test(
        getFileExtension(file.originalname).toLowerCase(),
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return true;
    } else {
        return false;
    }
}

export async function deleteFile(filepath) {
    try {
        await unlink(path.resolve(filepath));
        console.log('successfully deleted');
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function createFile(filepath, data) {
    const dataBuffer = new Uint8Array(Buffer.from(data));

    try {
        await writeFile(path.resolve(filepath), dataBuffer);
    } catch (error) {
        console.log(error);
    }
}

export async function fileExists(filpath) {
    try {
        await access(filpath, constants.R_OK | constants.W_OK);
        return true;
    } catch {
        return false;
    }
}
