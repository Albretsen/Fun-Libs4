import { Platform } from 'react-native';
import mobileAds, { TestIds } from 'react-native-google-mobile-ads';

export default function useAds() {
	const BannerAdID = process.env.EXPO_PUBLIC_DEVELOPMENT_MODE
		? TestIds.BANNER
		: Platform.OS === 'android'
			? 'ca-app-pub-1354741235649835/9424468100'
			: 'ca-app-pub-1354741235649835/2448171228';

	const initializeAds = async () => {
		await mobileAds()
			.initialize()
			.then(adapterStatuses => {});
	};

	return { initializeAds, BannerAdID };
}
