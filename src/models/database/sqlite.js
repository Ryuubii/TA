import { Sequelize } from 'sequelize';
import { logger } from '../../services/loggingService.js';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: msg => logger.info(msg),
});

export function getDB() {
    return db;
}

export async function checkConnection() {
    try {
        await db.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}
