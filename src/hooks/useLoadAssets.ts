import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const useLoadAssets = () => {
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);

	SplashScreen.preventAutoHideAsync();

	useEffect(() => {
		const loadResources = async () => {
			try {
				await Font.loadAsync({
					Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
					InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
				});

				await SplashScreen.hideAsync();
			} catch (error) {
				console.warn(error);
			} finally {
				setIsLoadingComplete(true);
			}
		};

		loadResources();
	}, []);

	return isLoadingComplete;
};
