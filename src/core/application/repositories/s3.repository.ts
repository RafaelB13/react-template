export interface IS3Repository {
  uploadFile(file: File): Promise<string>; // Returns the URL of the uploaded file
  listObjects(): Promise<string[]>; // Returns a list of object URLs
}
