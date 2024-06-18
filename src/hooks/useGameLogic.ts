import { useState, useCallback, useMemo } from 'react';
import useLib from './useLib';
import Lib from '../utils/libs';
import { router } from 'expo-router';
import { useLibStore } from './useLibStore';

export default function useGameLogic(item: Lib) {
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
			if (pointer >= item.parsed_prompts.length - 1) {
				win();
				return;
			}
			const newInputs: string[] = [...userInputs];
			newInputs[pointer] = input;
			setUserInputs(newInputs);
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

	const win = () => {
		let lib = getLib();
		lib.user_input = userInputs;
		setLib(lib);
		console.log('test');
		router.replace('/play/read'); //TODO: decide between "navigate" and "replace" method
	};

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
