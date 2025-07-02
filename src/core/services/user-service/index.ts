import apiInstance from '@/core/api/axios';

export interface IUserResponse {
  role: string;
  email: string;
  username: string;
  name?: string;
}

export class UserService {
  async getUser(): Promise<IUserResponse> {
    const response = await apiInstance.get<IUserResponse>('/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      },
    });

    localStorage.setItem('user', JSON.stringify(response.data));

    return response.data;
  }
}
