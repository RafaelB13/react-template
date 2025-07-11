import { create } from 'zustand';
import { UserService, IUserResponse } from '@/core/services/user-service';

interface IUserState {
  user: IUserResponse | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: IUserResponse) => void;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const userService = new UserService();
      const userData = await userService.getMe();
      set({ user: userData, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },
  setUser: (user: IUserResponse) => {
    set({ user });
  },
}));
