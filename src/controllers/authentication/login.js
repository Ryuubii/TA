/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { createToken } from '../../services/authentication/jwtService.js';
import { checkPassword } from '../../services/authentication/passwordService.js';
import { getUser } from '../../models/authentication/userModelLogic.js';
import { logger } from '../../services/loggingService.js';

const userPassError = 'Please provide a valid username and password!';
export const login = async (req, res) => {
    if (!req.body) return res.status(400).json({ error: userPassError });
    if (!req.body.username)
        return res.status(400).json({ error: userPassError });
    if (!req.body.password)
        return res.status(400).json({ error: userPassError });

    if (!req.header('X-CLIENT-ID'))
        return res.status(400).json({
            error: 'Please include your client ID in the header as X-CLIENT-ID',
        });

    const { username, password } = req.body;
    const clientId = req.header('X-CLIENT-ID');

    try {
        const user = await getUser(username);

        if (user === null)
            return res.status(404).json({ error: 'User not found!' });

        if (!(await checkPassword(password, user.password)))
            return res.status(400).json({ error: 'Wrong password' });

        if (clientId !== user.clientId)
            return res.status(400).json({
                error: 'Provided client ID does not match user client ID',
            });

        const userData = {
            username: user.username,
            clientId: user.clientId,
        };
        const token = createToken(userData);

        console.log('Reached here! 3');
        res.status(200).json({
            user: userData,
            token,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Could not login. Please try again later.',
        });
    }
};
