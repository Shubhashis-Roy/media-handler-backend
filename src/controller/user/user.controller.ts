import { Request, Response } from 'express';
import { allowedKeys, API_RESPONSE_MESSAGES, StatusCodes } from '@/constants';
import { USER_SAFE_DATA } from '@/constants/allowedDataPoints';
import { UserModel } from '@/models';
import { preferenceUpdateData, userModelType, updateProfilePayloadTypes } from '@/types';

export interface AuthenticatedRequest extends Request {
  user?: userModelType;
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
      return res.status(StatusCodes.UNAUTHORIZED).json(API_RESPONSE_MESSAGES.UNAUTHORIZED.ACCESS);
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(API_RESPONSE_MESSAGES.BAD_REQUEST.INVALID_FIELD);
    }

    const result = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: filteredData },
      { new: true, runValidators: true }
    ).select(USER_SAFE_DATA);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json(API_RESPONSE_MESSAGES.NOT_FOUND.USER_NOT_FOUND);
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

// update or add preferences
const addPreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json(API_RESPONSE_MESSAGES.UNAUTHORIZED.ACCESS);
    }

    const { theme, language } = req.body;

    const updateData: Record<string, preferenceUpdateData> = {};

    if (typeof theme !== 'undefined') {
      updateData['preferences.theme'] = theme;
    }

    if (typeof language !== 'undefined') {
      updateData['preferences.language'] = language;
    }

    // If no data provided
    if (Object.keys(updateData).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(API_RESPONSE_MESSAGES.BAD_REQUEST.INVALID_PREFERENCES);
    }

    const result = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        projection: 'firstName lastName email preferences',
      }
    );

    return res.status(StatusCodes.OK).send({
      response: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      title: 'addPreferences api Error',
      message,
    });
  }
};

export { getUserProfile, updateProfile, addPreferences };
