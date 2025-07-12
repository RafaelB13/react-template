import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { authService, getUserUseCase, updateUserUseCase } from '@/core/di';
import { IUpdateUserDTO, IUserResponse } from '@/core/domain/user.types';

export const useUserProfileController = () => {
  const [user, setUser] = useState<IUserResponse>();
  const [formData, setFormData] = useState<IUpdateUserDTO>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserUseCase.execute(); // <-- Use Case from DI
        setUser(data);
        setFormData(data ? { ...data } : {});
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData(user ? { ...user } : {});
    }
  };

  const handleSaveClick = async () => {
    if (!user?.id) {
      toast.error('User ID not found.');
      return;
    }
    try {
      const updatedUser = await updateUserUseCase.execute(user.id, formData); // <-- Usa o Caso de Uso
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
