/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { logger } from '../../services/loggingService.js';
import { verifyToken } from '../../services/authentication/jwtService.js';
import { getUserbyClientId } from '../../models/authentication/userModelLogic.js';
export const verify = async (req, res) => {
    if (!req.header('X-CLIENT-ID'))
        return res.status(400).json({
            error: 'Please include your client ID in the header as X-CLIENT-ID',
        });

    if (!req.header('authorization'))
        return res.status(400).json({
            error: 'Please include your token in the header as a Bearer token',
        });

    const clientId = req.header('X-CLIENT-ID');
    const token = req.header('authorization').split(' ')[1];

    try {
        const user = await getUserbyClientId(clientId);
        if (user === null)
            return res
                .status(404)
                .json({ error: 'User not found! Invalid client ID.' });

        const vOpts = {
            subject: user.username,
            audience: user.clientId,
        };

        if (verifyToken(token, vOpts)) {
            return res.status(200).json({
                user: {
                    username: user.username,
                    clientId: user.clientId,
                    role: user.role,
                },
                token,
            });
        } else {
            return res.status(500).json({
                error: 'Invalid token provided.',
            });
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            error: 'Could not validate the token. Try again later.',
        });
    }
};
