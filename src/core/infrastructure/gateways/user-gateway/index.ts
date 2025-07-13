
import { IUserRepository } from '@/core/application/repositories/user.repository';
import { IUpdateUserDTO, IUserResponse } from '@/core/domain/user.types';
import { IStorageService } from '@/core/application/services/storage.service';
import { IHttpClient } from '@/core/application/services/http-client.service';
import { handleServiceError } from '@/core/infrastructure/errors/handle-error';
import { API_ROUTES } from '@/core/infrastructure/api/routes';

export class UserGateway implements IUserRepository {
  constructor(private storageService: IStorageService, private httpClient: IHttpClient) {}

  async getMe(): Promise<IUserResponse> {
    try {
      const response = await this.httpClient.get<IUserResponse>(API_ROUTES.user.getMe);

      this.storageService.setItem('user', JSON.stringify(response));

      return response;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch user data.');
    }
  }

  async updateUser(id: string, data: IUpdateUserDTO): Promise<IUserResponse> {
    try {
      const response = await this.httpClient.patch<IUserResponse>(API_ROUTES.user.update(id), data);

      this.storageService.setItem('user', JSON.stringify(response));

      return response;
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to update user.');
    }
  }
}
