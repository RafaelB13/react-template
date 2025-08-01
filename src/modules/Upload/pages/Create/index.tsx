import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUploadCreateViewModel } from './view-model';

export const UploadCreatePage = () => {
  const { file, isUploading, uploadSuccess, handleFileSelect, handleUpload } = useUploadCreateViewModel();

  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isPasteActive, setIsPasteActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileSelect(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      event.preventDefault();

      const clipboardItems = event.clipboardData?.items;
      if (!clipboardItems) return;

      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];

        // Check if the item is a file
        if (item.kind === 'file') {
          const pastedFile = item.getAsFile();
          if (pastedFile) {
            // Check if it's an accepted file type
            const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
            const fileName = pastedFile.name || 'pasted-file';
            const fileExtension = fileName.includes('.') ? '.' + fileName.split('.').pop()?.toLowerCase() : '';
            const acceptedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];

            if (acceptedTypes.includes(pastedFile.type) || acceptedExtensions.includes(fileExtension)) {
              // Create a new file with a proper name if needed
              const finalFile = pastedFile.name
                ? pastedFile
                : new File([pastedFile], `pasted-image-${Date.now()}.png`, { type: pastedFile.type });

              setIsPasteActive(true);
              handleFileSelect(finalFile);

              // Reset paste visual feedback after a short delay
              setTimeout(() => setIsPasteActive(false), 1000);

              break; // Take only the first valid file
            }
          }
        }
      }
    },
    [handleFileSelect]
  );

  const handleAreaClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFile = useCallback(() => {
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFileSelect, fileInputRef]);

  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  const getFilePreview = (file: File) => {
    if (isImageFile(file)) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    let objectUrl: string | null = null;
    if (file && isImageFile(file)) {
      objectUrl = URL.createObjectURL(file);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  // Add paste event listener
  useEffect(() => {
    const handlePasteEvent = (event: ClipboardEvent) => {
      // Only handle paste when the upload area is focused or when not in an input field
      const activeElement = document.activeElement;
      const isInInputField =
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.hasAttribute('contenteditable'));

      if (!isInInputField) {
        handlePaste(event);
      }
    };

    document.addEventListener('paste', handlePasteEvent);

    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, [handlePaste]);

  useEffect(() => {
    if (uploadSuccess) {
      clearFile();
    }
  }, [uploadSuccess, clearFile]);

  return (
    <div className="bg-background flex h-screen flex-col p-6">
      <main className="flex flex-1 flex-col items-center justify-center">
        <span className="text-muted-foreground my-4 block text-center">Upload your files securely to S3</span>
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Upload File</CardTitle>
              <CardDescription>Select a file to upload to S3</CardDescription>
              <p className="text-muted-foreground text-xs">💡 Tip: You can paste files with Ctrl+V (Cmd+V on Mac)</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div
                className={`border-border hover:border-primary/50 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragOver ? 'border-primary bg-primary/5' : ''
                  } ${isPasteActive ? 'border-green-500 bg-green-500/10' : ''}`}
                onClick={handleAreaClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-muted-foreground">
                  <svg
                    className="mx-auto mb-4 h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {file ? (
                    <div className="space-y-4">
                      {isImageFile(file) && (
                        <div className="mx-auto max-w-40">
                          <img
                            src={getFilePreview(file) || ''}
                            alt="Preview"
                            className="max-h-32 w-full rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-foreground text-sm font-medium">{file.name}</p>
                        <p className="text-muted-foreground text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p className="text-muted-foreground text-xs">Type: {file.type || 'Unknown'}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm">Click to upload, drag and drop, or paste (Ctrl+V)</p>
                      <p className="text-muted-foreground text-xs">PNG, JPG, PDF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  onChange={handleFileInputChange}
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={handleAreaClick} className="w-full">
                  Browse Files
                </Button>
              </div>

              {file && (
                <Button className="w-full" onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Upload to S3'}
                </Button>
              )}

              {file && (
                <Button variant="outline" className="w-full" onClick={clearFile} disabled={isUploading}>
                  Clear Selection
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
