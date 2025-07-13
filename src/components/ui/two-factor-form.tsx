import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { container, Token } from '@/core/di';
import { AuthGateway } from '@/core/infrastructure/gateways/auth-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';
import { routes } from '@/core/presentation/router/routes';

const storageService = new StorageService();

export function TwoFactorAuthForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [code, setCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const submitForm = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      try {
        const loginService = container.resolve<AuthGateway>(Token.AuthGateway);
        const result = await loginService.twoFactorAuthentication(code, storageService.getItem('emailFor2FA') || '');

        if (result.access_token) {
          navigate(routes.home);
        }
      } catch (error) {
        setErrorMessage(
          `Login failed. Please check your credentials. ${error instanceof Error ? error.message : 'Check your credentials'}`
        );
        setShowErrorDialog(true);
      }
    },
    [code, navigate]
  );

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={submitForm} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Set your two-factor authentication code below to login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Code</Label>
          <Input
            id="username"
            type="text"
            placeholder="XXXXXX"
            required
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Confirm
        </Button>
      </div>
      <div className="text-center text-sm">
        <Link to={routes.login} className="underline underline-offset-4">
          Back to login
        </Link>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to={routes.sign_up} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Error</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
