export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  message?: string;
  isTwoFactorAuthenticationEnabled?: boolean;
  email?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
  data: {
    id: number;
    email: string;
    username: string;
  };
}
