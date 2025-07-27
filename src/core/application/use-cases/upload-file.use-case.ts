import { UploadS3FileUseCase } from './upload-s3-file.use-case';

export class UploadFileUseCase {
  constructor(private uploadS3FileUseCase: UploadS3FileUseCase) {}

  async execute(file: File): Promise<string> {
    return this.uploadS3FileUseCase.execute(file);
  }
}