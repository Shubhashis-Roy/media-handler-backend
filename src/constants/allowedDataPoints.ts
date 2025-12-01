import { updateProfilePayloadTypes } from '@/types';

export const allowedKeys: (keyof updateProfilePayloadTypes)[] = [
  'firstName',
  'lastName',
  'dateOfBirth',
  'city',
  'state',
  'country',
  'gender',
  'profession',
  'bio',
];

export const USER_SAFE_DATA =
  'firstName lastName email phone dateOfBirth city state country gender photoUrl bio profession preferences';
