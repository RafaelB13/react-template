import { create } from 'zustand';
import { IUserResponse } from '@/core/domain/user.types';
import { UserGateway } from '@/core/infrastructure/gateways/user-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';
import { AxiosHttpClient } from '@/core/infrastructure/api/axios-http-client';

const storageService = new StorageService();
const httpClient = new AxiosHttpClient();

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
      const userService = new UserGateway(storageService, httpClient);
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
