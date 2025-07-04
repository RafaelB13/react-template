// src/core/errors/business-errors.ts

const businessErrorMessages: Record<string, string> = {
  // Auth Errors
  'Invalid credentials': 'Invalid credentials. Please check your email and password.',
  'User account is locked': 'Your account is locked. Please contact support.',
  'Invalid two-factor authentication code': 'Invalid two-factor authentication code.',
  'Access token has expired or is invalid': 'Access token has expired or is invalid. Please log in again.',

  // User Errors
  'User not found': 'User not found.',
  'Email already in use': 'This email is already in use.',

  // Upload Errors
  'Error processing your file': 'An error occurred while processing your file.',
  'Unsupported file type': 'Unsupported file type.',

  // Default Error
  DEFAULT: 'An unexpected error occurred. Please try again later.',
};

/**
 * Returns the business error message corresponding to an API message.
 * @param apiMessage The error message returned by the API.
 * @returns The user-friendly error message.
 */
export const getBusinessErrorMessage = (apiMessage?: string): string => {
  if (apiMessage && businessErrorMessages[apiMessage]) {
    return businessErrorMessages[apiMessage];
  }
  // If the API message is not in the map, return the API message itself
  // or a default message if the API message is null.
  return apiMessage || businessErrorMessages.DEFAULT;
};

export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
  }
}
