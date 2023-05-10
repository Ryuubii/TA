import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { logger } from '../../services/loggingService.js';

const hostname = process.env.MYSQL_HOSTNAME;
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;

function init() {
    return new Sequelize(database, username, password, {
        host: hostname,
        dialect: 'mysql',
        logging: msg => logger.info(msg),
    });
}

export function getDB() {
    return init();
}

export function checkConnection() {
    try {
        init().authenticate();
        logger.info('Connection has been established successfully.');
        return true;
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        return false;
    }
}
