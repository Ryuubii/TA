import * as dotenv from 'dotenv';
dotenv.config();

const adminUsername = process.env.SUPER_ADMIN_USERNAME;

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export const assignPrivilege = async (req, res, next) => {
    if (!req.user) next();

    req.user.isSuperAdmin = false;
    req.user.isAdmin = false;

    if (req.user.username === adminUsername) {
        req.user.isSuperAdmin = true;
        req.user.isAdmin = true;
        next();
    }

    if (req.user.role === 'admin') {
        req.user.isAdmin = true;
        next();
    }
    next();
};
