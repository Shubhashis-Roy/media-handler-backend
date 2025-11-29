import { Router } from 'express';
import { register, login, logout } from '@/controller';

const authRouter = Router();

// Register
authRouter.post('/signup', register);

// Login
authRouter.post('/login', login);

// Logout
authRouter.post('/logout', logout);

export default authRouter;
