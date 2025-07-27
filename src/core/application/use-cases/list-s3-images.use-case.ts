import { IS3Repository } from "@/core/application/repositories/s3.repository";

export class ListS3ImagesUseCase {
  constructor(private s3Repository: IS3Repository) {}

  async execute(): Promise<string[]> {
    return this.s3Repository.listObjects();
  }
}
