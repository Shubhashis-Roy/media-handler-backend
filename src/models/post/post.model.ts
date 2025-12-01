import { postModelType } from '@/types';
import mongoose, { Schema, Model } from 'mongoose';
// import validator from 'validator';

// -------------------------
// Schema definition
// -------------------------
const postSchema = new Schema<postModelType>({}, { timestamps: true });

// -------------------------
// Model export
// -------------------------
const Post: Model<postModelType> = mongoose.model<postModelType>('Post', postSchema);
export default Post;
