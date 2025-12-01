export interface updateProfilePayloadTypes {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // "03/02/2003"
  city?: string;
  state?: string;
  country?: string;
  gender?: string;
  profession?: string;
  bio?: string;
}

type preferenceUpdateKeys = 'preferences.theme' | 'preferences.language';
export type preferenceUpdateData = Partial<Record<preferenceUpdateKeys, string>>;
