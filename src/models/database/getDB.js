import { getDB as getMySQL } from './mysql.js';
import { getDB as getSQLite } from './sqlite.js';
import * as dotenv from 'dotenv';
dotenv.config();

const dbDriver = process.env.DB_DRIVER;

export const sequelize = (dbDriver === 'mysql') ? getMySQL() : getSQLite();
