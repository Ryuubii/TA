/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { verifyToken } from '../services/authentication/jwtService.js';
import { getUserbyClientId } from '../models/authentication/userModelLogic.js';

export const ensureAuthorization = async (req, res, next) => {
    if (!req.header('X-CLIENT-ID'))
        return res.status(400).json({
            error: 'Please include your client ID in the header as X-CLIENT-ID',
        });

    const cId = req.header('X-CLIENT-ID');
    const token = req.header('authorization')?.split(' ')[1];

    if (token === null || typeof token === 'undefined')
        return res.sendStatus(403);

    try {
        const user = await getUserbyClientId(cId);
        if (user === null) return res.sendStatus(403);

        const vOpts = {
            subject: user.username,
            audience: user.clientId,
        };

        if (verifyToken(token, vOpts)) {
            req.user = {
                username: user.username,
                clientId: user.clientId,
                role: user.role,
            };
            next();
        } else {
            return res.sendStatus(403);
        }
    } catch (error) {
        return res.sendStatus(403);
    }
};
