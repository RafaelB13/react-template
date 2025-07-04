import { create } from 'zustand';

interface SettingsMenuState {
  isOpen: boolean;
  toggle: () => void;
}

export const useSettingsMenuStore = create<SettingsMenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
