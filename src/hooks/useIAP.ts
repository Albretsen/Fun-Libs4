import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { supabase } from '../../supabase';
import { usePackStore } from './usePackStore';
import useAuth from './useAuth';

let isConfigured = false;

export default function useIAP() {
	const { setOwnedPacks } = usePackStore();

	const { session, getSession } = useAuth();

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

	const setOwnedPacksState = async (customerInfo: any | undefined) => {
		if (!customerInfo) {
			const [purchasedProducts, legacyPacks] = await Promise.all([
				(async () => {
					const info = await Purchases.getCustomerInfo();
					return info.allPurchasedProductIdentifiers || [];
				})(),
				(async () => {
					const legacyPacks = await checkLegacyOwnedPacks();
					return legacyPacks || [];
				})(),
			]);

			const packs = [...purchasedProducts, ...legacyPacks];

			if (packs.length > 0) {
				setOwnedPacks(packs);
			}
		} else {
			if (customerInfo.allPurchasedProductIdentifiers) {
				setOwnedPacks(customerInfo.allPurchasedProductIdentifiers);
			}
		}
	};

	const checkLegacyOwnedPacks = async () => {
		let localSession = await getSession();
		if (!localSession?.user.email) return;
		const result = await supabase
			.from('users')
			.select(`*`)
			.eq('email', localSession?.user.email)
			.limit(1)
			.single();
		if (result.data?.purchases) {
			return result.data.purchases;
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

	const purchase = async (pack: string | null) => {
		if (!pack) return;
		try {
			pack += '_pack';
			if (!session || !session.user) {
				throw new Error('User is not signed in');
			}

			const fetchedProducts = await Purchases.getOfferings();

			let packageToPurchase = null;
			const offerings = fetchedProducts.all.offerings.availablePackages;

			for (let i = 0; i < offerings.length; i++) {
				if (offerings[i].identifier === pack) {
					packageToPurchase = offerings[i];
					break;
				}
			}

			if (!packageToPurchase) {
				throw new Error(`Package with identifier ${pack} not found.`);
			}

			const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);

			setOwnedPacksState(customerInfo);

			return customerInfo;
		} catch (error) {
			if (!(error instanceof Error)) return;
			console.error('Error during purchase:', error.message);

			if (error.userCancelled) {
				console.log('User cancelled the purchase.');
			} else {
				console.log('Purchase failed due to an error.');
			}
		}
	};

	const getPrice = async (pack: string | null) => {
		if (!pack) return '';
		pack += '_pack';
		const fetchedProducts = await Purchases.getOfferings();

		let packageToPurchase = null;
		const offerings = fetchedProducts.all.offerings.availablePackages;

		for (let i = 0; i < offerings.length; i++) {
			if (offerings[i].identifier === pack) {
				packageToPurchase = offerings[i];
				break;
			}
		}

		if (!packageToPurchase) {
			throw new Error(`Package with identifier ${pack} not found.`);
		}

		return packageToPurchase.product.priceString;
	};

	return { initializeIAP, purchase, getPrice, setOwnedPacksState };
}
