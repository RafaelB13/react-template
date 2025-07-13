import { BusinessError } from '@/core/infrastructure/errors/business-errors';

export function handleServiceError(error: unknown, defaultMessage: string): never {
  if (error instanceof BusinessError) {
    throw error;
  }

  let message = defaultMessage;

  if (error && typeof error === 'object') {
    if ('response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
      const data = (error.response as any).data;
      if (data && typeof data === 'object' && 'message' in data) {
        message = data.message;
      }
    } else if ('message' in error) {
      message = String((error as { message: string }).message);
    }
  } else if (typeof error === 'string') {
    message = error;
  }

  throw new BusinessError(message);
}

