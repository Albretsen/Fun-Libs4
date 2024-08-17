import { create } from 'zustand';

interface PackState {
	pack: string | null;
	setPack: (lib: string | null) => void;
	getPack: () => string | null;
	ownedPacks: string[] | null;
	setOwnedPacks: (ownedPacks: string[]) => void;
	getOwnedPacks: () => string[] | null;
	packsData: any;
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
	packsData: {
		romance: {
			title: 'The Romantic Pack ❤️',
			description: 'This pack unlocks high quality stories with a romantic theme.',
		},
		historic: {
			title: 'The Historic Pack 🚀',
			description: 'This pack unlocks high quality stories from history.',
		},
		easter: {
			title: 'The Easter Pack 🐣',
			description: 'This pack unlocks high quality stories with an easter theme.',
		},
		christmas: {
			title: 'The Christmas Pack 🎄',
			description:
				'This pack unlocks high quality stories with a christmas theme.',
		},
	},
}));
