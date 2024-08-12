import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { supabase } from '../../supabase';
import { usePackStore } from './usePackStore';

let isConfigured = false;

export default function useIAP() {
	const { setOwnedPacks } = usePackStore();

	const setAPIKey = async () => {
		if (Platform.OS === 'ios') {
			await Purchases.configure({ apiKey: 'appl_bMsEzGxJwHgmqENbiBWtwshHxOh' });
		} else if (Platform.OS === 'android') {
			await Purchases.configure({ apiKey: 'goog_XgnhUeKjYuxuYkDsCnROqYgnPpK' });
		}
	};

	const setAuthListener = async () => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_IN') {
				if (session?.user.id) await Purchases.logIn(session.user.id);
				if (session?.user.email) Purchases.setEmail(session.user.email);
				if (session?.user.user_metadata.username) {
					Purchases.setDisplayName(session.user.user_metadata.username);
				}
			} else if (event === 'SIGNED_OUT') {
				await Purchases.logOut();
			}
		});
	};

	const setOwnedPacksState = async () => {
		const customerInfo = await Purchases.getCustomerInfo();
		if (customerInfo.allPurchasedProductIdentifiers) {
			setOwnedPacks(customerInfo.allPurchasedProductIdentifiers);
		}
	};

	const initializeIAP = async () => {
		if (!isConfigured) {
			Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
			await setAPIKey();
			await setAuthListener();
			await setOwnedPacksState();
			isConfigured = true;
		}
	};

	return { initializeIAP };
}
