import * as dotenv from 'dotenv';
dotenv.config();
import { checkConnection as mysqlcheck } from './mysql.js';
import { checkConnection as sqlitecheck } from './sqlite.js';
import {
    CreateUserModelTable,
    CreateDatasetModelTable,
} from '../createTables.js';
import { createAdminUser } from '../createAdminUser.js';

const dbDriver = process.env.DB_DRIVER;

export const connectDB = async () => {
    if (dbDriver === 'mysql') {
        if (!mysqlcheck()) process.exit();
    } else if (!sqlitecheck()) process.exit();

    await CreateUserModelTable();
    await CreateDatasetModelTable();
    await createAdminUser();
};
