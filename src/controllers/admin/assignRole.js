/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { assignRoleToUser } from '../../models/authentication/userModelLogic.js';
import { isAbleToAssignRole } from '../../services/admin/abilityService.js';
import { logger } from '../../services/loggingService.js';

export const assignRole = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403);
    if (!req.body || !req.body.clientId)
        return res
            .status(400)
            .json({ error: 'clientId of the user is required!' });
    if (!req.body || !req.body.role)
        return res
            .status(400)
            .json({ error: 'role to be assigned is required!' });
    try {
        const ok = await isAbleToAssignRole(
            req.body.clientId,
            req.user.isAdmin,
            req.user.isSuperAdmin,
        );
        if (!ok) return res.sendStatus(403);

        const result = await assignRoleToUser(req.body.clientId, req.body.role);
        if (result) {
            return res.sendStatus(204);
        } else {
            return res
                .status(500)
                .json({ error: 'Error assining role to the user.' });
        }
    } catch (error) {
        logger.error(error);
        return res
            .status(500)
            .json({ error: 'Error assining role to the user.' });
    }
};
