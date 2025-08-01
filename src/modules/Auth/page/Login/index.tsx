import { GalleryVerticalEnd } from 'lucide-react';

import UploadBg from '@/assets/upload-login-logo.png';
import { useFetchUserIP } from '@/core/presentation/hooks/fetch-user-ip.hook';
import { LoginForm } from '@/modules/Auth/components/login-form';

export default function LoginPage() {
  const { isUserIPLoading, userIP, userIpFetchError } = useFetchUserIP();

  return (
    <div className="fixed inset-0 grid min-h-screen overflow-hidden lg:grid-cols-2">
      <div className="flex min-h-screen flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Hi{' '}
            <span className="text-muted-foreground">
              {isUserIPLoading ? 'Loading...' : userIP?.ip || userIpFetchError || 'Guest'}
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden min-h-screen lg:block">
        <img
          src={UploadBg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
