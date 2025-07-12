export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
