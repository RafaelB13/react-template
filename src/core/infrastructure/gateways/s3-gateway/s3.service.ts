import { S3Client, PutObjectCommand, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IS3Repository } from '@/core/application/repositories/s3.repository';

export class S3Service implements IS3Repository {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME;
    this.s3Client = new S3Client({
      region: import.meta.env.VITE_AWS_S3_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
      },
      endpoint: import.meta.env.VITE_AWS_S3_ENDPOINT,
      forcePathStyle: true, // Required for MinIO
    });
  }

  async uploadFile(file: File): Promise<string> {
    const key = `${Date.now()}-${file.name}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: file.type,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600, // 1 hour
      });

      await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      // Construct the public URL of the uploaded file
      const fileUrl = `${import.meta.env.VITE_AWS_S3_ENDPOINT}/${this.bucketName}/${key}`;
      return fileUrl;
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async listObjects(): Promise<string[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
      });

      const { Contents } = await this.s3Client.send(command);

      if (!Contents) {
        return [];
      }

      const fileUrls = Contents.map((object: _Object) => {
        if (object.Key) {
          // Construct the public URL of the object
          return `${import.meta.env.VITE_AWS_S3_ENDPOINT}/${this.bucketName}/${object.Key}`;
        }
        return '';
      }).filter(Boolean);

      return fileUrls;
    } catch (error) {
      console.error("Error listing objects from S3:", error);
      throw new Error("Failed to list objects from S3.");
    }
  }
}
