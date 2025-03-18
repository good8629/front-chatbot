import { create } from "zustand";

interface TogievelabsModalState {
    llm: string,
    agents: string[],
    openTogievelabsModal: (llm: string, agnts: string[]) => void;
}

export const useTogievelabsModalStore = create<TogievelabsModalState>((set) => ({
    llm: "ChatGPT",
    agents: ["youtube_tool"],
    openTogievelabsModal: (llm, agents) => set({llm, agents})
}));