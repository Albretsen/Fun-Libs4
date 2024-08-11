import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { AppState, Platform } from 'react-native';
import useAds from '../useAds';
import useIAP from '../useIAP';

export const useInitializeScripts = () => {
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);

	const { initializeAds } = useAds();

	const { initializeIAP } = useIAP();

	useEffect(() => {
		const initializeScripts = async () => {
			try {
				addAuthRefresh();
				await initializeAds();
				await initializeIAP();
			} catch (error) {
				console.warn(error);
			} finally {
				setIsLoadingComplete(true);
			}
		};

		initializeScripts();
	}, [initializeAds]);

	const addAuthRefresh = () => {
		AppState.addEventListener('change', state => {
			if (state === 'active') {
				supabase.auth.startAutoRefresh();
			} else {
				supabase.auth.stopAutoRefresh();
			}
		});
	};

	return isLoadingComplete;
};
