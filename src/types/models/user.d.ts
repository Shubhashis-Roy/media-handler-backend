export interface userType extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  // userName?: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  password: string;
  signupMethod?: 'email' | 'google';
  isEmailVerified?: boolean;
  dateOfBirth?: number;
  gender?: 'male' | 'female' | 'other';
  photoUrl?: string[];
  interest?: 'male' | 'female' | 'non-binary' | 'custom';
  profession?: string;
  education?: string;
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
