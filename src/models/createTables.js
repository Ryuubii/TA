import { logger } from '../services/loggingService.js';
import { DatasetModel, UserModel } from './models.js';

const CreateUserModelTable = async () => {
    try {
        await UserModel.sync();
        logger.info('The table for the User model was created!');
    } catch (error) {
        logger.error(error, "\nCouldn't create the User model table!");
    }
};

const CreateDatasetModelTable = async () => {
    try {
        await DatasetModel.sync();
        logger.info('The table for the GraphDatasets model was just created!');
    } catch (error) {
        logger.error(error, "\nCouldn't create the GraphDatasetss table!");
    }
};

export { CreateUserModelTable, CreateDatasetModelTable };
