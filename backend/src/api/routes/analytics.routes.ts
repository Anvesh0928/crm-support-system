import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';
import { authenticateJwt, authorizeRoles } from '../../shared/middleware/auth.middleware.js';
import { UserRole } from '../../shared/constants/enums.js';

const router = Router();
const controller = new AnalyticsController();

router.use(authenticateJwt);

router.get('/overview', controller.getOverview);
router.post('/snapshot', authorizeRoles(UserRole.ADMIN, UserRole.SUPERVISOR), controller.triggerSnapshot);

export const analyticsApiRoutes = router;
