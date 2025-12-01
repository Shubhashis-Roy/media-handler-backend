import { Request, Response } from 'express';
import { allowedKeys, StatusCodes } from '@/constants';
import { USER_SAFE_DATA } from '@/constants/allowedDataPoints';
import { UserModel } from '@/models';
import { userType } from '@/types';
import { updateProfilePayloadTypes } from '@/types/controller/userController';

export interface AuthenticatedRequest extends Request {
  user?: userType;
}

// Get User Profile
const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(StatusCodes.OK).send({
      response: user,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      title: 'getUserProfile api Error',
      message,
    });
  }
};

// Update user profile
const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const filteredData: Partial<updateProfilePayloadTypes> = {};

    Object.entries(req.body).forEach(([key, value]) => {
      const typedKey = key as keyof updateProfilePayloadTypes;

      if (allowedKeys.includes(typedKey) && value !== undefined && value !== null && value !== '') {
        {
          if (typeof value === 'string') {
            filteredData[typedKey] = value as string;
          }
        }
      }
    });

    if (Object.keys(filteredData).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const result = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: filteredData },
      { new: true, runValidators: true }
    ).select(USER_SAFE_DATA);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(StatusCodes.OK).send({
      response: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      title: 'updateProfile api Error',
      message,
    });
  }
};

export { getUserProfile, updateProfile };
