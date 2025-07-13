import { toast } from 'sonner';

import { DisableTwoFactorAuthenticationUseCase } from '@/core/application/use-cases/disable-two-factor-authentication.use-case';
import { GetUserUseCase } from '@/core/application/use-cases/get-user.use-case';
import { RequestTwoFactorAuthenticationUseCase } from '@/core/application/use-cases/request-two-factor-authentication.use-case';
import { UpdateUserUseCase } from '@/core/application/use-cases/update-user.use-case';
import { container } from '@/core/di/container';
import { Token } from '@/core/di/tokens';
import { useUserProfileStore } from '@/modules/User/pages/Profile/store.ts';

export class UserProfileViewModel {
  private getUserUseCase: GetUserUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private requestTwoFactorAuthenticationUseCase: RequestTwoFactorAuthenticationUseCase;
  private disableTwoFactorAuthenticationUseCase: DisableTwoFactorAuthenticationUseCase;

  constructor() {
    this.getUserUseCase = container.resolve<GetUserUseCase>(Token.GetUserUseCase);
    this.updateUserUseCase = container.resolve<UpdateUserUseCase>(Token.UpdateUserUseCase);
    this.requestTwoFactorAuthenticationUseCase = container.resolve<RequestTwoFactorAuthenticationUseCase>(
      Token.RequestTwoFactorAuthenticationUseCase
    );
    this.disableTwoFactorAuthenticationUseCase = container.resolve<DisableTwoFactorAuthenticationUseCase>(
      Token.DisableTwoFactorAuthenticationUseCase
    );
  }

  public async fetchUser(): Promise<void> {
    try {
      const data = await this.getUserUseCase.execute();
      useUserProfileStore.getState().setUser(data);
      useUserProfileStore.getState().setFormData(data ? { ...data } : {});
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  public handleEditClick = () => {
    const { isEditing, user, setIsEditing, setFormData } = useUserProfileStore.getState();
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData(user ? { ...user } : {});
    }
  };

  public handleSaveClick = async () => {
    const { user, formData, setIsEditing, setShowSuccess, setUser } = useUserProfileStore.getState();
    if (!user?.id) {
      toast.error('User ID not found.');
      return;
    }
    try {
      const updatedUser = await this.updateUserUseCase.execute(user.id, formData);
      setUser(updatedUser);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile.');
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formData, setFormData } = useUserProfileStore.getState();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  public handleEnable2FA = async () => {
    try {
      await this.requestTwoFactorAuthenticationUseCase.execute();
      toast.success('A confirmation email was sent to your email.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  public handleDisable2FA = async () => {
    try {
      await this.disableTwoFactorAuthenticationUseCase.execute();
      const currentUser = useUserProfileStore.getState().user;
      useUserProfileStore
        .getState()
        .setUser(currentUser ? { ...currentUser, isTwoFactorAuthenticationEnabled: false } : undefined);
      toast.success('Two-factor authentication disabled successfully.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
}
