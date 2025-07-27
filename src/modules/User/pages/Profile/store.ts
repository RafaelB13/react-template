import { create } from 'zustand';

import { IUpdateUserDTO, IUserResponse } from '@/core/domain/user.types';

interface UserProfileState {
  user: IUserResponse | undefined;
  formData: IUpdateUserDTO;
  isEditing: boolean;
  showSuccess: boolean;
  setUser: (user: IUserResponse | undefined) => void;
  setFormData: (formData: IUpdateUserDTO) => void;
  setIsEditing: (isEditing: boolean) => void;
  setShowSuccess: (showSuccess: boolean) => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  user: undefined,
  formData: {},
  isEditing: false,
  showSuccess: false,
  setUser: (user) => set({ user }),
  setFormData: (formData) => set({ formData }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setShowSuccess: (showSuccess) => set({ showSuccess }),
}));
