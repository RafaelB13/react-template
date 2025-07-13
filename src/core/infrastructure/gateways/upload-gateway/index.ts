import { IUploadRepository } from '@/core/application/repositories/upload.repository';
import { IHttpClient } from '@/core/application/services/http-client.service';
import { API_ROUTES } from '@/core/infrastructure/api/routes';
import { handleApiError } from '@/core/infrastructure/errors/handle-error';

export class UploadGateway implements IUploadRepository {
  constructor(private httpClient: IHttpClient) {}

  async upload(file: FormData): Promise<void> {
    try {
      await this.httpClient.post(API_ROUTES.upload.create, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      handleApiError(error, 'Failed to upload file.');
    }
  }
}
