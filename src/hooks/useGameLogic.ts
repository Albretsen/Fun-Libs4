import { useState, useCallback, useMemo, useEffect } from 'react';
import useLib from './useLib';
import Lib from '../utils/libs';
import { router } from 'expo-router';
import { useLibStore } from './useLibStore';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import useAds from './useAds';

export default function useGameLogic(item: Lib) {
	const { InterstitialAdID } = useAds();
	const { isLoaded, isClosed, load, show } = useInterstitialAd(InterstitialAdID);

	const { getPrompt, getPromptDescription } = useLib();
	const { getLib, setLib } = useLibStore();

	const [pointer, setPointer] = useState(0);
	const [userInputs, setUserInputs] = useState<string[]>([]);

	const prompt = useMemo(
		() => getPrompt(item, pointer),
		[item, pointer, getPrompt],
	);
	const description = useMemo(
		() => getPromptDescription(prompt),
		[prompt, getPromptDescription],
	);
	const percentageCompleted = useMemo(
		() => (pointer / (item.parsed_prompts.length - 1)) * 100,
		[pointer],
	);

	const forward = useCallback(
		(input: string) => {
			const newInputs: string[] = [...userInputs];
			newInputs[pointer] = input;
			setUserInputs(newInputs);
			if (pointer >= item.parsed_prompts.length - 1) {
				win(newInputs);
				return;
			}
			setPointer(pointer + 1);
		},
		[pointer, userInputs, item],
	);

	const backward = useCallback(
		(input: string) => {
			if (pointer <= 0) return;
			const newInputs: string[] = [...userInputs];
			newInputs[pointer] = input;
			setUserInputs(newInputs);
			setPointer(pointer - 1);
		},
		[pointer, userInputs],
	);

	const win = (finalInputs: string[]) => {
		let lib = getLib();
		lib.user_input = finalInputs;
		setLib(lib);
		if (isLoaded) {
			// Shows ad
			show();
		} else {
			router.replace('/play/read');
		}
	};

	useEffect(() => {
		// Loads ad
		load();
	}, [load]);

	useEffect(() => {
		if (isClosed) {
			// Action after the ad is closed
			router.replace('/play/read');
		}
	}, [isClosed, router]);

	return {
		prompt,
		description,
		percentageCompleted,
		userInputs,
		pointer,
		forward,
		backward,
	};
}
