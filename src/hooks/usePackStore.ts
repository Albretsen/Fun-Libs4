import { create } from 'zustand';

interface PackState {
	pack: string | null;
	setPack: (lib: string | null) => void;
	getPack: () => string | null;
}

export const usePackStore = create<PackState>()((set, get) => ({
	pack: null,
	setPack: pack => {
		set(() => ({ pack }));
	},
	getPack: () => {
		return get().pack;
	},
}));
