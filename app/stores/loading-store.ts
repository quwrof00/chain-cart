import { create } from 'zustand';

type State = {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
};

export const useLoadingStore = create<State>((set) => ({
  isLoading: false,
  setLoading: (val) => set({ isLoading: val }),
}));
