import { create } from 'zustand';

interface LoginFormState {
  email: string;
  password: string;
  errorMessage: string;
  showErrorDialog: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrorMessage: (message: string) => void;
  setShowErrorDialog: (show: boolean) => void;
  reset: () => void;
}

const initialState = {
  email: 'admin@sistema.com',
  password: 'Admin@2025!',
  errorMessage: '',
  showErrorDialog: false,
};

export const useLoginFormStore = create<LoginFormState>(set => ({
  ...initialState,
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setErrorMessage: message => set({ errorMessage: message }),
  setShowErrorDialog: show => set({ showErrorDialog: show }),
  reset: () => set(initialState),
}));
