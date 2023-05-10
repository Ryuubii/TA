import * as dotenv from 'dotenv';
dotenv.config();

import { renameSync, unlinkSync } from 'node:fs';
import { CreateGraphDatasetsBulk } from '../../models/dataset/datasetModelLogic.js';
import { generateID } from '../../utilities/GenerateID.js';
import { checkFileCSV } from '../../utilities/FileUtil.js';
import { readCsv } from '../../utilities/ReadCsv.js';
import { sep } from 'node:path';
import { TransformDataForDB } from '../../utilities/TransformData.js';

const uploadFolder = 'public/';

function getFileExtension(filename) {
    filename = filename.split('.');
    return filename[filename.length - 1];
}

export async function saveDataset(req, res) {
    const clientId = req.header('X-CLIENT-ID');
    const file = req.file;
    const ext = getFileExtension(file.originalname);
    try {
        const id = generateID();
        const newName = `${id}.${ext}`;
        renameSync(
            `${uploadFolder}/${file.filename}`,
            `${uploadFolder}/${newName}`,
        );

        createDatasetsBulk(file, newName, id, clientId);

        return res.status(200).json({
            id: id,
            msg: 'Upload successful',
        });
    } catch (err) {
        unlinkSync(`${uploadFolder}/${file.filename}`);
        return res.status(500).json('Upload failed');
    }
}

async function createDatasetsBulk(file, newName, id, clientId) {
    let data;
    if (checkFileCSV(file)) {
        data = await readCsv(newName);
    } else {
        const response = await fetch(`..${sep}..${sep}public${sep}${newName}`);
        data = await response.json();
    }
    const datasetArray = TransformDataForDB(data, id, clientId);
    await CreateGraphDatasetsBulk(datasetArray);
}
