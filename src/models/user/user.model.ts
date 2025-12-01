import mongoose, { Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModelType } from '@/types';
import { photoSchema } from './userPhoto.schema';

// -------------------------
// Schema definition
// -------------------------
const userSchema = new Schema<userModelType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    // userName: {
    //   type: String,
    //   unique: true,
    //   // required: true,
    //   lowercase: true,
    //   trim: true,
    //   minlength: 3,
    // },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email Id: ' + value);
        }
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // validate(value: string) {
      //   if (!validator.isStrongPassword(value)) {
      //     throw new Error('Enter a strong password: ' + value);
      //   }
      // },
    },
    signupMethod: {
      type: String,
      enum: ['email', 'google'],
      default: 'email',
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    dateOfBirth: {
      type: String,
      // required: true,
      match: /^\d{2}\/\d{2}\/\d{4}$/,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      default: 'india',
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: `{VALUE} is not a valid gender type!`,
      },
    },
    photoUrl: {
      type: [photoSchema],
      validate: {
        validator: (arr: string[]) => arr.length <= 3,
        message: 'You can upload a maximum of 3 photos',
      },
    },
    profession: {
      type: String,
    },
    bio: {
      type: String,
    },
    preferences: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      language: { type: String, default: 'english' },
    },
  },
  { timestamps: true }
);

// Index for fast query
userSchema.index({ firstName: 1 });

// -------------------------
// Methods
// -------------------------
userSchema.methods.getJWT = async function (): Promise<string> {
  const user = this as userModelType;

  if (!process.env.SECRET_TOKEN) {
    throw new Error('SECRET_TOKEN not defined in environment variables');
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '1d' });

  return token;
};

userSchema.methods.validatePassword = async function (
  passwordInputByUser: string
): Promise<boolean> {
  const user = this as userModelType;
  return bcrypt.compare(passwordInputByUser, user.password);
};

// -------------------------
// Model export
// -------------------------
const User: Model<userModelType> = mongoose.model<userModelType>('User', userSchema);
export default User;
