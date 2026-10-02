import { Alert, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

// React Native Web's Alert.alert is a no-op, so show a toast on web instead.
export function showAlert(message: string, type: 'error' | 'success' = 'error') {
	if (Platform.OS === 'web') {
		Toast.show(
			type === 'error'
				? { type, text1: 'Error', text2: message }
				: { type, text1: message },
		);
	} else {
		Alert.alert(message);
	}
}
