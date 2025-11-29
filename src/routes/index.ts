import { Router } from 'express';
import authRoutes from './auth/auth.route';

const router = Router();

// All the routes
router.use('/', authRoutes);

export default router;
