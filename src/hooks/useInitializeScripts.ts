import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { AppState } from 'react-native';

export const useInitializeScripts = () => {
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);

	useEffect(() => {
		const initializeScripts = async () => {
			try {
				addAuthRefresh();
			} catch (error) {
				console.warn(error);
			} finally {
				setIsLoadingComplete(true);
			}
		};

		initializeScripts();
	}, []);

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
