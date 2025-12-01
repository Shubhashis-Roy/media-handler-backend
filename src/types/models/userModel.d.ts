export interface userModelType extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  // userName?: string;
  email: string;
  phone?: string;
  password: string;
  signupMethod?: 'email' | 'google';
  isEmailVerified?: boolean;
  dateOfBirth?: string;
  city?: string;
  state?: string;
  country?: string;
  gender?: 'male' | 'female' | 'other';
  photoUrl?: photosType[];
  profession?: string;
  bio?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
  };
  createdAt: Date;
  updatedAt: Date;

  getJWT(): Promise<string>;
  validatePassword(passwordInputByUser: string): Promise<boolean>;
}

export interface photosType extends Document {
  url?: string;
  public_id?: string;
}
