import { useState } from 'react';
import useLib from './useLib';
import { supabase } from '../../supabase';

export default function useCreateLogic() {
	const { parseTextToLib } = useLib();

	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const [cursorPosition, setCursorPosition] = useState<any>({
		end: 0,
		start: 0,
	});

	const addPrompt = (prompt: string) => {
		prompt = '(' + prompt + ')';

		setBody(prevBody => {
			const start = cursorPosition.start;
			const end = cursorPosition.end;

			setCursorPosition({
				start: start + prompt.length,
				end: end + prompt.length,
			});

			return prevBody.slice(0, start) + prompt + prevBody.slice(end);
		});
	};

	return {
		title,
		setTitle,
		body,
		setBody,
		addPrompt,
		setCursorPosition,
		cursorPosition,
	};
}
