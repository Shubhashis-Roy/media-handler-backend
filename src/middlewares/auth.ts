import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '@/models';
import { API_RESPONSE_MESSAGES, StatusCodes } from '@/constants';

declare module 'express-serve-static-core' {
  interface Request {
    user?: typeof UserModel.prototype;
  }
}

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.cookies as { token?: string };

    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).send(API_RESPONSE_MESSAGES.UNAUTHORIZED.ACCESS);
      return;
    }

    const secret = process.env.SECRET_TOKEN;
    if (!secret) {
      throw new Error('SECRET_TOKEN is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & { _id: string };
    const { _id } = decoded;

    const user = await UserModel.findById(_id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send(API_RESPONSE_MESSAGES.NOT_FOUND.USER_NOT_FOUND);
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Auth middleware Error: ${message}`);
  }
};
