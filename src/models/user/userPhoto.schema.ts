import { Schema } from 'mongoose';
import validator from 'validator';
import { photosType } from '@/types';

interface TypedValidatorProps<T> {
  path: string;
  value: T;
  type: string;
  reason?: Error;
}

const photoSchema = new Schema<photosType>(
  {
    url: {
      type: String,
      validate: {
        validator: (value: string) => validator.isURL(value),
        message: (props: TypedValidatorProps<string[]>) => `Invalid photo URL: ${props.value}`,
      },
    },

    public_id: {
      type: String,
    },
  },
  { _id: false }
);

export { photoSchema };
