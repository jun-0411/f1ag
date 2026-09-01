import { create } from 'zustand';

interface MobileNavigationState {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

const useMobileNavigationStore = create<MobileNavigationState>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMobileNavigationStore;
