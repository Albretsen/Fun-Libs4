import { useState } from 'react';

export default function useCreateLogic() {
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const [cursorPosition, setCursorPosition] = useState<any>({
		end: 0,
		start: 0,
	});

	const addPrompt = (prompt: string) => {
		console.log('Adding ' + prompt);
	};

	return { title, setTitle, body, setBody, addPrompt, setCursorPosition };
}
