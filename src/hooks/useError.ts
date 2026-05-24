import Toast from 'react-native-toast-message';

export default function useError() {
	const funLibsError = (error: unknown, showToast: boolean = true) => {
		try {
			let errorMessage = 'Please try again.';
			if (error instanceof Error && error.message) errorMessage = error.message;
			if (showToast) {
				Toast.show({
					type: 'error',
					text1: 'Error',
					text2: errorMessage,
				});
			}
		} catch {
			console.log(error);
		}
	};

	return { funLibsError };
}
