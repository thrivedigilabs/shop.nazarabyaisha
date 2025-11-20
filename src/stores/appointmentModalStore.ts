import { create } from 'zustand';

interface AppointmentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAppointmentModal = create<AppointmentModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
