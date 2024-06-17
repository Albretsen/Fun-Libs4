import { create } from 'zustand';
import Lib from '../utils/libs';

interface LibState {
	lib: any | null;
	setLib: (lib: any) => void;
	getLib: () => any | null;
}

export const useLibStore = create<LibState>()((set, get) => ({
	lib: null,
	setLib: lib => {
		set(() => ({ lib }));
	},
	getLib: () => {
		return get().lib;
	},
}));
