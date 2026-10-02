// Web stand-in for react-native-google-mobile-ads (native-only).
// Ads are simply not shown in the browser.
const noop = () => {};

const mobileAds = () => ({
	initialize: async () => [],
	setRequestConfiguration: async () => {},
});

export default mobileAds;

export const TestIds = {
	BANNER: 'web-test-banner',
	INTERSTITIAL: 'web-test-interstitial',
	REWARDED: 'web-test-rewarded',
};

export const BannerAdSize = {
	ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
	BANNER: 'BANNER',
};

export const BannerAd = () => null;

const interstitialState = {
	isLoaded: false,
	isOpened: false,
	isClosed: false,
	isClicked: false,
	isShowing: false,
	error: undefined,
	load: noop,
	show: noop,
};

export const useInterstitialAd = () => interstitialState;
