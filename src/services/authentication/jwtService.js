import * as dotenv from 'dotenv';
import { logger } from '../loggingService.js';
dotenv.config();
import jwt from 'jsonwebtoken';
import { readFileSync } from 'node:fs';

const privKeyFile = process.env.JWT_PRIVATE_KEY;
const pubKeyFile = process.env.JWT_PUBLIC_KEY;

const iss = process.env.JWT_ISSUER;

const privateKEY = readFileSync(privKeyFile, 'utf8');
const publicKEY = readFileSync(pubKeyFile, 'utf8');

const defaultOptions = {
    issuer: iss,
    expiresIn: '7d',
    algorithm: 'ES512',
};

const createToken = payload => {
    const opts = {
        ...defaultOptions,
        subject: payload.username,
        audience: payload.clientId,
    };
    try {
        return jwt.sign(payload, privateKEY, opts);
    } catch (error) {
        logger.error(error);
    }
};

const verifyToken = (token, verifyOptions) => {
    const opts = {
        ...defaultOptions,
        ...verifyOptions,
    };

    try {
        return jwt.verify(token, publicKEY, opts);
    } catch (error) {
        logger.error(error);
        return false;
    }
};

export { createToken, verifyToken };
