import { create } from "zustand";

type FrontService = {
	ID: number;
	name: string;
	hostname: string;
	version: string;
};

export const useServiceStore = create((set) => ({
	services: [],
	setServices: (services: FrontService[]) => set({ services }),
}));
