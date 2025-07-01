export class CreateController {
  async uploadFile(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      await response.json();
    } catch (error) {
      throw new Error(`Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
