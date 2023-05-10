import { getUserbyClientId } from '../../models/authentication/userModelLogic.js';
export const isAbleToBanUnban = async (
    clientId,
    isAdmin = false,
    isSuperAdmin = false,
) => {
    const user = await getUserbyClientId(clientId);
    if (user === null || typeof user === 'undefined')
        throw new Error('Something went wrong');

    if (isSuperAdmin) return true;
    if (user.role === 'admin' && !isSuperAdmin) return false;
    if (user.role === 'user' && isAdmin) return true;

    throw new Error('Something went wrong');
};

export const isAbleToAssignRole = async (
    clientId,
    isAdmin = false,
    isSuperAdmin = false,
) => {
    const user = await getUserbyClientId(clientId);
    if (user === null || typeof user === 'undefined')
        throw new Error('Something went wrong');

    if (isSuperAdmin) return true;
    if (!isAdmin) return false;

    throw new Error('Something went wrong');
};
