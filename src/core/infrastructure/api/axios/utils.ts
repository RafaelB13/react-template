/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/utils.ts
import { AxiosError } from 'axios';

import { ApiError } from '@/core/infrastructure/api/types';

/**
 * Normalizes and extracts information from an Axios error.
 * @param error The Axios error to be processed.
 * @returns An ApiError object with a standardized message.
 */
export const handleAxiosError = (error: AxiosError): ApiError => {
  let message = 'An unexpected error occurred.';
  let statusCode = 500;

  if (error.response) {
    // The server responded with an error status (non-2xx)
    const { data, status } = error.response;
    statusCode = status;

    if (typeof data === 'object' && data !== null && (data as any).message) {
      message = (data as any).message;
    } else if (typeof data === 'string') {
      message = data;
    } else {
      message = `Server error: ${status}`;
    }
  } else if (error.request) {
    // The request was made, but no response was received
    message = 'No response received from the server. Please check your network connection.';
    statusCode = 0; // Or another code to indicate no response
  } else {
    // Something else happened while setting up the request
    message = error.message;
  }

  return { message, statusCode };
};
