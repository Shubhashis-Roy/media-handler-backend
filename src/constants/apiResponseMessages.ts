const createResponseMessage = (message: string) => ({
  message,
});

export const API_RESPONSE_MESSAGES = {
  // Success Messages
  SUCCESS: {
    OTP_SENT: createResponseMessage('OTP has been sent successfully.'),
    OTP_VERIFIED: createResponseMessage('OTP has been verified successfully.'),
    RESEND_OTP: createResponseMessage('Resend OTP has  been sent successfully.'),
  },

  // Client Error Messages (400 Series)
  BAD_REQUEST: {
    INVALID_PREFERENCES: createResponseMessage('No valid preferences to update.'),
    INVALID_FIELD: createResponseMessage('No valid fields to update.'),
    INVALID_OTP: createResponseMessage('Invalid OTP. Please try again.'),
    INVALID_PHONE_NO: createResponseMessage('Invalid phone number. Please try again.'),
    OTP_VERIFY_LIMIT_EXCEEDED: createResponseMessage('Max limit reached for this otp verification'),
    ENTER_OTP: createResponseMessage('Please enter OTP'),
    INVALID_TOKEN: createResponseMessage('The provided token is invalid.'),
    TRY_AGAIN: createResponseMessage('Please try again.'),
    INVALID_ID: createResponseMessage('The provided ID is invalid.'),
    INVALID_ROLE_FOR_ID: createResponseMessage(
      'The role associated with the provided ID is invalid.'
    ),
    INVALID_CATEGORY_ID: createResponseMessage('One or more category IDs are invalid.'),
    INVALID_LANGUAGE_ID: createResponseMessage('One or more language IDs are invalid.'),
    INVALID_ROLE_FOR_PHONE_NO: createResponseMessage(
      'The role does not match the provided phone number.'
    ),
    NO_FILES_UPLOADED: createResponseMessage('No files have been uploaded.'),
  },

  // Unauthorized Access Messages (401 Series)
  UNAUTHORIZED: {
    ACCESS: createResponseMessage('Unauthorized access, Please login!!!'),
  },

  // Forbidden Access Messages (403 Series)
  FORBIDDEN: {
    ACCESS: createResponseMessage('Access denied: You are not authorized to access this API.'),
    ACTION: createResponseMessage('Permission denied for this action.'),
  },

  // Not Found Messages (404 Series)
  NOT_FOUND: {
    USER_NOT_FOUND: createResponseMessage('User not found.'),
    USER: createResponseMessage('User with the provided ID could not be found.'),
    SESSION: {
      SESSION_NOT_FOUND: createResponseMessage('Session with the provided ID could not be found.'),
      ACTIVE_SESSION_NOT_FOUND: createResponseMessage('No active session found for current user.'),
      PENDING_SESSION_NOT_FOUND: createResponseMessage(
        'No pending session found for current user.'
      ),
    },
    FEEDBACK: createResponseMessage('Feedback with the provided ID could not be found.'),
    FCM_TOKEN: {
      CONSUMER: createResponseMessage('Consumer FCM Token not found.'),
      EXPERT: createResponseMessage('Expert FCM Token not found.'),
    },
  },

  // Not Acceptable Messages (406 Series)
  NOT_ACCEPTABLE: {
    USER_ID_CONFLICT: createResponseMessage('User IDs cannot be the same.'),
    ONE_ACCOUNT_ALLOWED: createResponseMessage('Only one bank account is allowed per user.'),
    BANK_DETAILS_EXIST: createResponseMessage('This bank account and IFSC already exist.'),
    BANK_ACCOUNT_NUMBER_EXIST: createResponseMessage(
      'This bank account already exist with different profile.'
    ),
    ACTIVE_BANK_ACCOUNT_EXIST: createResponseMessage('You already have an active bank account.'),
    BANK_NOT_FOUND: createResponseMessage('No Bank account found!'),
  },

  // Conflict Messages (409 Series)
  CONFLICT: {
    SESSION_PARTICIPANT_MISMATCH: createResponseMessage(
      'You cannot perform this action because you are not a participant in this session.'
    ),

    EMAIL_ALREADY_EXISTS: createResponseMessage('The email address is already in use.'),
  },
};
