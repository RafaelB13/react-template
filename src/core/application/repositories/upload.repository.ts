export interface IUploadRepository {
  upload(file: FormData): Promise<void>;
}
