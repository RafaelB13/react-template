import { create } from 'zustand';

type IUserIP = {
  ip: string;
};

interface IGetUserIPStore {
  userIP: IUserIP | null;
  loading: boolean;
  error: string | null;
  fetchUserIP: () => Promise<void>;
}

export const useGetUserIPStore = create<IGetUserIPStore>((set) => ({
  userIP: null,
  loading: false,
  error: null,

  fetchUserIP: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ userIP: data, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },
}));
