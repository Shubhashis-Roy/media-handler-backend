import { Router } from 'express';
import authRoutes from './auth/auth.route';
import userRouter from './user/user.route';

const router = Router();

// All the routes
router.use('/', authRoutes);
router.use('/user', userRouter);

export default router;
