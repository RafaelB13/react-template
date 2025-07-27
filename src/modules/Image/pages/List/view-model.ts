import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ListS3ImagesUseCase } from '@/core/application/use-cases/list-s3-images.use-case';
import { Token } from '@/core/di/tokens';
import { useDependency } from '@/core/presentation/hooks/use-dependency.hook';

export const useImageListPageViewModel = () => {
  const listS3ImagesUseCase = useDependency<ListS3ImagesUseCase>(Token.ListS3ImagesUseCase);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const urls = await listS3ImagesUseCase.execute();
        setImageUrls(urls);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images.');
        toast.error(err instanceof Error ? err.message : 'Failed to load images.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [listS3ImagesUseCase]);

  return {
    imageUrls,
    isLoading,
    error,
  };
};
