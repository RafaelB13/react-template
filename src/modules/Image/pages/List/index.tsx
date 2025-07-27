import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useImageListPageViewModel } from './view-model';
import GlobalLoader from '@/components/ui/global-loader';

export const ImageListPage = () => {
  const { imageUrls, isLoading, error } = useImageListPageViewModel();

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col p-6">
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Your S3 Images</h1>
        {imageUrls.length === 0 ? (
          <p className="text-muted-foreground">No images found in your S3 bucket.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full">
            {imageUrls.map((url, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <img src={url} alt={`S3 Image ${index + 1}`} className="w-full h-48 object-cover" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
