/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export const ensureIsAdmin = async (req, res, next) => {
    if (!req.user) return res.sendStatus(403);

    if (req.user.isAdmin || req.user.isSuperAdmin) {
        next();
    } else {
        return res.sendStatus(403);
    }
};
