import { create } from "zustand";

interface ModalState {
    isOpen: boolean;
    data: string;
    openModel: (data: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    data: "",
    openModel: (data) => set({isOpen: true, data})
}));