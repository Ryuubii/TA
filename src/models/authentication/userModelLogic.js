import { hashPassword } from '../../services/authentication/passwordService.js';
import { logger } from '../../services/loggingService.js';
import { UserModel } from '../models.js';

const createUser = async userObject => {
    const user = {
        ...userObject,
    };
    const hash = await hashPassword(user.password);
    user.password = hash;
    try {
        const { username, clientId, role } = await UserModel.create(user);
        return { username, clientId, role };
    } catch (error) {
        logger.error(error);
        return JSON.stringify({
            message: 'Could not create the user.',
        });
    }
};

const getUser = async username => {
    try {
        return await UserModel.findOne({
            where: { username },
            attributes: ['username', 'password', 'clientId', 'role'],
        });
    } catch (error) {
        logger.error(error);
        return null;
    }
};

const getUserbyClientId = async clientId => {
    try {
        return await UserModel.findOne({
            where: { clientId },
            attributes: ['username', 'password', 'clientId', 'role'],
        });
    } catch (error) {
        logger.error(error);
        return null;
    }
};

const getAllUsers = async () => {
    try {
        return await UserModel.findAll({
            attributes: ['username', 'clientId'],
        });
    } catch (error) {
        logger.error(error);
        return JSON.stringify({
            message: 'Could not get all the users.',
        });
    }
};

const isUsernameAvailable = async username => {
    try {
        const { count } = await UserModel.findAndCountAll({
            where: { username },
        });
        return count === 0 ? true : false;
    } catch (error) {
        logger.error(error);
        return false;
    }
};

const banUserByClientId = async cid => {
    try {
        await UserModel.update(
            { isBanned: true },
            {
                where: { clientId: cid },
            },
        );
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
};

const unbanUserByClientId = async cid => {
    try {
        await UserModel.update(
            { isBanned: false },
            {
                where: { clientId: cid },
            },
        );
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
};

const isUserBanned = async username => {
    try {
        const { isBanned } = await UserModel.findOne({
            where: { username },
            attributes: ['isBanned'],
        });
        return isBanned;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

const assignRoleToUser = async (cid, newRole) => {
    try {
        await UserModel.update(
            { role: newRole },
            {
                where: { clientId: cid },
            },
        );
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
};

export {
    createUser,
    getUser,
    getAllUsers,
    getUserbyClientId,
    isUsernameAvailable,
    banUserByClientId,
    unbanUserByClientId,
    isUserBanned,
    assignRoleToUser,
};
