/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import {
    createUser,
    isUsernameAvailable,
} from '../../models/authentication/userModelLogic.js';
import { isPasswordValid } from '../../services/authentication/passwordService.js';
import { createToken } from '../../services/authentication/jwtService.js';

const userPassError = 'Please provide a valid username and password!';
export const register = async (req, res) => {
    if (!req.body) return res.status(400).json({ error: userPassError });
    if (!req.body.username)
        return res.status(400).json({ error: userPassError });
    if (!req.body.password)
        return res.status(400).json({ error: userPassError });

    const { ok, err } = isPasswordValid(req.body.password);
    if (!ok) return res.status(400).json({ error: err });

    if (!(await isUsernameAvailable(req.body.username)))
        return res.status(400).json({ error: 'Username is not available!' });

    const { username, password } = req.body;
    try {
        const user = await createUser({
            username,
            password,
        });

        const token = createToken(user);

        res.status(201).json({
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Could not create the account. Please try again later.',
        });
    }
};
