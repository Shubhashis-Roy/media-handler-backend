import { register, login, logout } from './auth/auth.controller';
import { healthCheck } from './health/health.controller';
import { getUserProfile, updateProfile, addPreferences } from './user/user.controller';

export { register, login, logout, healthCheck, getUserProfile, updateProfile, addPreferences };
