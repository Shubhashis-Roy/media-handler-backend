import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '@/models';

declare module 'express-serve-static-core' {
  interface Request {
    user?: typeof UserModel.prototype;
  }
}

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.cookies as { token?: string };

    if (!token) {
      res.status(401).send('Please Login!!!');
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
      res.status(404).send('UserModel not found');
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).send(`Auth middleware Error: ${message}`);
  }
};
