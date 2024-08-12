import { create } from 'zustand';

interface PackState {
	pack: string | null;
	setPack: (lib: string | null) => void;
	getPack: () => string | null;
	ownedPacks: string[] | null;
	setOwnedPacks: (ownedPacks: string[]) => void;
	getOwnedPacks: () => string[] | null;
}

export const usePackStore = create<PackState>()((set, get) => ({
	pack: null,
	setPack: pack => {
		set(() => ({ pack }));
	},
	getPack: () => {
		return get().pack;
	},
	ownedPacks: null,
	setOwnedPacks: ownedPacks => {
		set(() => ({ ownedPacks }));
	},
	getOwnedPacks: () => {
		return get().ownedPacks;
	},
}));
