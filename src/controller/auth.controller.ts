import validator from 'validator';
import bcrypt from 'bcrypt';
import { validateSignUpData } from '../utils/validation';
import { Request, Response } from 'express';
import User from '@/models/user.model';

// Register
const register = async (req: Request, res: Response) => {
  try {
    const { password, firstName, lastName, city, email, dob, gender, interest } = req.body;

    const alreadyPresentUser = await User.findOne({ email });

    if (alreadyPresentUser) {
      res.status(409).json({ message: 'Email already exists', alreadyPresentUser });
      return;
    }

    // Validation of data
    validateSignUpData(req);

    // Encryt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      dateOfBirth: dob,
      city,
      interest,
      gender,
    });

    const savedUser = await user.save();
    // Create a JWT token
    const token = await savedUser.getJWT();

    // Add the token to cookie & send the res back to the user
    // res.cookie('token', token, {
    //   expires: new Date(Date.now() + 24 * 3600000),
    // });
    res.cookie('token', token);

    res.status(200).send({ message: 'User Added Successfully!', data: savedUser });
  } catch (error) {
    // if (err.code === 11000) {
    //   res.status(400).send("Email already exists");
    // } else {
    //   res.status(400).send(`Signup Error: ${err.message}`);
    // }
    const message = error instanceof Error ? error.message : String(error);

    res.status(400).send(`Signup Error: ${message}`);
  }
};

// Login
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!validator.isEmail(email)) {
      throw new Error('Email Id not valid!');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email Id is not present!');
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error('Password is not correct');
    }

    const token = await user.getJWT();

    res.cookie('token', token, {
      expires: new Date(Date.now() + 2 * 3600000),
      httpOnly: true,
      sameSite: 'lax',
    });

    // const userObj = user.toObject() as IUser;
    // delete (userObj as any).password;

    res.status(200).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).send(`Login API Error: ${message}`);
  }
};

const logout = async (req: Request, res: Response) => {
  res
    .cookie('token', null, {
      expires: new Date(Date.now()),
    })
    .send('Logout Successful!!');
};

export { register, login, logout };
