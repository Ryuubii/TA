import express from 'express';
import adminController from '../controllers/admin/adminController.js';
import { ensureIsAdmin } from '../middleware/ensureIsAdmin.js';

const router = express.Router();

/**
 * Route to ban users.
 * @name get /admin/ban
 *
 * @param clientId
 */
router.get('/test', ensureIsAdmin, adminController.testMethod);

router.post('/ban', ensureIsAdmin, adminController.banUser);
router.post('/unban', ensureIsAdmin, adminController.unbanUser);
router.post('/role', ensureIsAdmin, adminController.assignRole);

export default router;
