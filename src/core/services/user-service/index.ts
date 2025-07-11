import apiInstance from '@/core/api/axios';

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

export class UserService {
  async getMe(): Promise<IUserResponse> {
    const response = await apiInstance.get<IUserResponse>('/users/me');

    localStorage.setItem('user', JSON.stringify(response.data));

    return response.data;
  }

  async getUser(): Promise<IUserResponse> {
    return this.getMe();
  }

  async updateUser(id: string, data: IUpdateUserDTO): Promise<IUserResponse> {
    const response = await apiInstance.patch<IUserResponse>(`/users/${id}`, data);

    localStorage.setItem('user', JSON.stringify(response.data));

    return response.data;
  }
}
