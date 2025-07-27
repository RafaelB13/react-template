import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { GetUserUseCase } from '@/core/application/use-cases/get-user.use-case';
import { UploadFileUseCase } from '@/core/application/use-cases/upload-file.use-case';
import { Token } from '@/core/di/tokens';
import { IUserResponse } from '@/core/domain/user.types';
import { useDependency } from '@/core/presentation/hooks/use-dependency.hook';

export const useUploadCreateViewModel = () => {
  const getUserUseCase = useDependency<GetUserUseCase>(Token.GetUserUseCase);
  const uploadFileUseCase = useDependency<UploadFileUseCase>(Token.UploadFileUseCase);

  const [user, setUser] = useState<IUserResponse>();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserUseCase.execute();
        setUser(data);
      } catch {
        toast.error('Failed to fetch user data. Please refresh the page.');
      }
    };

    fetchUser();
  }, [getUserUseCase]);

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
    try {
      await uploadFileUseCase.execute(file);
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
