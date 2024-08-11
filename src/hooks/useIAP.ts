import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { supabase } from '../../supabase';

export default function useIAP() {
	const initializeIAP = async () => {
		Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

		if (Platform.OS === 'ios') {
			await Purchases.configure({ apiKey: 'appl_bMsEzGxJwHgmqENbiBWtwshHxOh' });
		} else if (Platform.OS === 'android') {
			await Purchases.configure({ apiKey: 'goog_XgnhUeKjYuxuYkDsCnROqYgnPpK' });
		}

		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_IN') {
				if (session?.user.id) await Purchases.logIn(session.user.id);
			} else if (event === 'SIGNED_OUT') {
				await Purchases.logOut();
			}
		});
	};

	return { initializeIAP };
}
