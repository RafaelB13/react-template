import { IUploadRepository } from '@/core/application/repositories/upload.repository';

export class UploadFileUseCase {
  constructor(private uploadRepository: IUploadRepository) {}

  async execute(file: FormData): Promise<void> {
    return this.uploadRepository.upload(file);
  }
}
