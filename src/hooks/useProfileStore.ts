import { create } from 'zustand';

interface ProfileState {
	user_id: string | null;
	setProfileUserId: (lib: string | null) => void;
	getProfileUserId: () => string | null;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
	user_id: null,
	setProfileUserId: user_id => {
		set(() => ({ user_id }));
	},
	getProfileUserId: () => {
		return get().user_id;
	},
}));
