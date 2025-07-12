import { create } from 'zustand';

interface LoadingState {
  requestCount: number;
  isLoading: boolean;
  incrementRequestCount: () => void;
  decrementRequestCount: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  requestCount: 0,
  isLoading: false,
  incrementRequestCount: () =>
    set((state) => {
      const newCount = state.requestCount + 1;
      return { requestCount: newCount, isLoading: newCount > 0 };
    }),
  decrementRequestCount: () =>
    set((state) => {
      const newCount = Math.max(0, state.requestCount - 1);
      return { requestCount: newCount, isLoading: newCount > 0 };
    }),
}));
