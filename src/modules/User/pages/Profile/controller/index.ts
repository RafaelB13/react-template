import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { IUpdateUserDTO, IUserResponse, UserService } from '@/core/services/user-service';

export const useUserProfileController = () => {
  const [user, setUser] = useState<IUserResponse>();
  const [formData, setFormData] = useState<IUpdateUserDTO>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dataString = localStorage.getItem('user') || '{}';
        const data = JSON.parse(dataString);
        setUser(data);
        setFormData(data ? { ...data } : {});
      } catch {
        toast.error('Failed to fetch user data.');
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
    const userService = new UserService();
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateUser(user?.id || '', formData);
      setUser(updatedUser);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return {
    user,
    formData,
    isEditing,
    isLoading,
    showSuccess,
    handleEditClick,
    handleSaveClick,
    handleChange,
  };
};
