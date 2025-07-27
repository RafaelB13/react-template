import { IS3Repository } from '@/core/application/repositories/s3.repository';

export class UploadS3FileUseCase {
  constructor(private s3Repository: IS3Repository) {}

  async execute(file: File): Promise<string> {
    return this.s3Repository.uploadFile(file);
  }
}
