import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { AuthService } from '@/core/services/auth-service';
import { IUpdateUserDTO, IUserResponse, UserService } from '@/core/services/user-service';

export const useUserProfileController = () => {
  const [user, setUser] = useState<IUserResponse>();
  const [formData, setFormData] = useState<IUpdateUserDTO>({});
  const [isEditing, setIsEditing] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const userService = useMemo(() => new UserService(), []);
  const authService = new AuthService();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUser();
        setUser(data);
        setFormData(data ? { ...data } : {});
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchUser();
  }, [userService]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData(user ? { ...user } : {});
    }
  };

  const handleSaveClick = async () => {
    try {
      const updatedUser = await userService.updateUser(user?.id || '', formData);
      setUser(updatedUser);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEnable2FA = async () => {
    try {
      await authService.requestTwoFactorAuthentication();
      toast.success('A confirmation email was sent to your email.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleDisable2FA = async () => {
    try {
      await authService.disableTwoFactorAuthentication();
      setUser((prevUser) => (prevUser ? { ...prevUser, isTwoFactorAuthenticationEnabled: false } : undefined));
      toast.success('Two-factor authentication disabled successfully.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return {
    user,
    formData,
    isEditing,
    showSuccess,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handleEnable2FA,
    handleDisable2FA,
  };
};
