// Web stand-in for react-native-purchases (RevenueCat).
// In-app purchases are unavailable in the browser: no products, nothing owned.
const notOnWeb = () =>
	Promise.reject(new Error('In-app purchases are not available on web.'));

export const LOG_LEVEL = {
	VERBOSE: 'VERBOSE',
	DEBUG: 'DEBUG',
	INFO: 'INFO',
	WARN: 'WARN',
	ERROR: 'ERROR',
};

const Purchases = {
	setLogLevel: () => {},
	configure: () => {},
	logIn: async () => ({ customerInfo: { allPurchasedProductIdentifiers: [] }, created: false }),
	logOut: async () => ({ allPurchasedProductIdentifiers: [] }),
	setEmail: async () => {},
	setDisplayName: async () => {},
	getCustomerInfo: async () => ({ allPurchasedProductIdentifiers: [] }),
	getOfferings: async () => ({ all: { offerings: { availablePackages: [] } }, current: null }),
	purchasePackage: notOnWeb,
};

export default Purchases;
