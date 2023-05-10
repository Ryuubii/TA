import * as dotenv from 'dotenv';
dotenv.config();

import {
    createUser,
    isUsernameAvailable,
} from './authentication/userModelLogic.js';

const adminUser = process.env.SUPER_ADMIN_USERNAME;
const adminPass = process.env.SUPER_ADMIN_PASSWORD;
const adminClientID = process.env.SUPER_ADMIN_CLIENTID;

export const createAdminUser = async () => {
    if (!(await isUsernameAvailable(adminUser))) return;
    const admin = {
        username: adminUser,
        password: adminPass,
        clientId: adminClientID,
        role: 'admin',
    };
    await createUser(admin);
};
