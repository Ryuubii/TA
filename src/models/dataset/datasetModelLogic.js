import { logger } from '../../services/loggingService.js';
import { DatasetModel } from '../models.js';

async function CreateGraphDatasets(col1_data, col2_data, unique_id) {
    try {
        const df = await DatasetModel.create({
            col1_data,
            col2_data,
            unique_id,
        });
        return JSON.stringify(df);
    } catch (error) {
        logger.error(error);
        return JSON.stringify({
            message: 'Could not save the file to db.',
        });
    }
}

async function GetGraphDatasetsByID(id) {
    try {
        const df = await DatasetModel.findByPk(id);
        return JSON.stringify(df);
    } catch (error) {
        logger.error(error);
        return JSON.stringify({
            message: 'Could not file the requested file.',
        });
    }
}

async function GetDatasetByUniqueID(uuid) {
    try {
        const dataset = await DatasetModel.findAll({
            where: { unique_id: uuid },
            attributes: ['col1_data', 'col2_data'],
        });
        return dataset;
    } catch (error) {
        logger.error(error);
        return JSON.stringify({
            message: 'Could not find the requested dataset.',
        });
    }
}

async function CreateGraphDatasetsBulk(datasetArray) {
    try {
        const df = await DatasetModel.bulkCreate(datasetArray);
        return JSON.stringify(df);
    } catch (error) {
        logger.error(error);
        return JSON.stringify({
            message: 'Could not save the file to db.',
        });
    }
}

async function GraphDatasetExists(uuid) {
    try {
        const { count } = await DatasetModel.findAndCountAll({
            where: { unique_id: uuid },
        });

        return count >= 1 ? true : false;
    } catch (error) {
        logger.error(error);
        return false;
    }
}

export {
    CreateGraphDatasets,
    GetGraphDatasetsByID,
    GetDatasetByUniqueID,
    CreateGraphDatasetsBulk,
    GraphDatasetExists,
};
