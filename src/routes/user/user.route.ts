import express from 'express';
import { addPreferences, getUserProfile, updateProfile } from '@/controller';
import { userAuth } from '@/middlewares/auth';

const userRouter = express.Router();

//Profile
userRouter.get('/', userAuth, getUserProfile);

//Edit profile
userRouter.patch('/details', userAuth, updateProfile);

//Preferences
userRouter.post('/preferences', userAuth, addPreferences);

// //Add profile
// userRouter.post('/upload-photos', userAuth, upload.array('photo', 6), addPhotos);

export default userRouter;
