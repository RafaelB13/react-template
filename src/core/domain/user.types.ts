export interface IUserResponse {
  id: string;
  role: string;
  email: string;
  username: string;
  name?: string;
  isTwoFactorAuthenticationEnabled: boolean;
  themeColor?: string;
  themeMode?: 'light' | 'dark' | 'system';
  created_at: string;
  updated_at: string;
}

export type IUpdateUserDTO = Partial<Omit<IUserResponse, 'role' | 'id'>>;
