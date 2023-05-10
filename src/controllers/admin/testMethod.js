/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export const testMethod = (req, res) => {
    return res.status(200).json({ user: req.user });
};
