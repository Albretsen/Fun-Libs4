import { createWithEqualityFn } from 'zustand/traditional';

interface ProfileState {
	user_id: string | null;
	setProfileUserId: (user_id: string | null) => void;
	getProfileUserId: () => string | null;
}

export const useProfileStore = createWithEqualityFn<ProfileState>()((set, get) => ({
	user_id: null,

	setProfileUserId: (user_id) => {
		set(() => ({ user_id }));
	},

	getProfileUserId: () => get().user_id,
}));
