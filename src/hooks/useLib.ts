import Lib from '../utils/libs';

export default function useLib() {
	const parseTextToLib = (text: string): Lib => {
		const parsed_text = [];
		const parsed_prompts = [];
		const regex = /\(([^)]+)\)/g;

		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text)) !== null) {
			parsed_text.push(text.slice(lastIndex, match.index));
			parsed_prompts.push({ [match[1]]: [parsed_text.length] });
			parsed_text.push('');
			lastIndex = regex.lastIndex;
		}

		parsed_text.push(text.slice(lastIndex));

		return new Lib(parsed_text, parsed_prompts);
	};

	return { parseTextToLib };
}
