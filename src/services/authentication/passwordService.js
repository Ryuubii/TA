import bcrypt from 'bcrypt';
import { passwordStrength } from 'check-password-strength';

const SALT_ROUNDS = 10;

export const hashPassword = async password => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const checkPassword = async (userPassword, hash) => {
    return (await bcrypt.compare(userPassword, hash)) ? true : false;
};

export const isPasswordValid = password => {
    if (passwordStrength(password).id > 1) {
        return { ok: true, err: null };
    } else {
        return {
            ok: false,
            err: 'Password must be 8 characters long and must contain at one number, letter and special character!',
        };
    }
};
