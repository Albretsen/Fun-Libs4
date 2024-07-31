import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { AppState } from 'react-native';
import useAds from '../useAds';

export const useInitializeScripts = () => {
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);

	const { initializeAds } = useAds();

	useEffect(() => {
		const initializeScripts = async () => {
			try {
				addAuthRefresh();
				await initializeAds();
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
