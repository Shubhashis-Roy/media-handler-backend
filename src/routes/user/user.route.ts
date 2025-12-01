import express from 'express';
import { getUserProfile, updateProfile } from '@/controller';
import { userAuth } from '@/middlewares/auth';

const userRouter = express.Router();

//Profile
userRouter.get('/', userAuth, getUserProfile);

//Edit profile
userRouter.patch('/edit', userAuth, updateProfile);

// //Add profile
// userRouter.post('/upload-photos', userAuth, upload.array('photo', 6), addPhotos);

export default userRouter;
