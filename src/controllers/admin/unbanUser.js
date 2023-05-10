/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { unbanUserByClientId } from '../../models/authentication/userModelLogic.js';
import { isAbleToBanUnban } from '../../services/admin/abilityService.js';

export const unbanUser = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403);

    if (!req.body || !req.body.clientId)
        return res
            .status(400)
            .json({ error: 'clientId of the user is required!' });

    try {
        const ok = await isAbleToBanUnban(
            req.body.clientId,
            req.user.isAdmin,
            req.user.isSuperAdmin,
        );
        if (!ok) return res.sendStatus(403);

        await unbanUserByClientId(req.body.clientId);
        return res.status(204);
    } catch (error) {
        return res.status(500).json({ error: 'Error unbanning the user.' });
    }
};
