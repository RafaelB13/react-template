import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { IUserResponse } from '@/core/domain/user.types';
import { UserGateway } from '@/core/infrastructure/gateways/user-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';
import { AxiosHttpClient } from '@/core/infrastructure/api/axios-http-client';

const storageService = new StorageService();
const httpClient = new AxiosHttpClient();

export const useUploadCreateController = () => {
  const [user, setUser] = useState<IUserResponse>();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const userService = new UserGateway(storageService, httpClient);
    const fetchUser = async () => {
      try {
        const data = await userService.getMe();
        setUser(data);
      } catch {
        toast.error('Failed to fetch user data. Please refresh the page.');
      }
    };

    fetchUser();
  }, []);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setUploadSuccess(false); // Reset success state on new file selection
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    const formData = new FormData();
    formData.append('file', file);

    try {

      // await apiInstance.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      setUploadSuccess(true);

      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload file.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    user,
    file,
    isUploading,
    uploadSuccess,
    handleFileSelect,
    handleUpload,
  };
};
