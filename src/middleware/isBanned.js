import { isUserBanned } from '../models/authentication/userModelLogic.js';

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export const isBanned = async (req, res, next) => {
    if (!req.user) next();

    const result = await isUserBanned(req.user.username);

    if (result === null) return res.sendStatus(403);

    if (result) return res.sendStatus(403);

    next();
};
