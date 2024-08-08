import Lib from '../utils/libs';
import nlp from 'compromise';
import levenshteinDistance from '../utils/levenshtein';
import { supabase } from '../../supabase';

export default function useLib() {
	const uploadLib = async (title: string, body: string) => {
		let lib = parseTextToLib(body);
		const { data, error } = await supabase.from('libs').insert({ ...lib, title });
		if (error !== null) throw error;
		return data;
	};

	const deleteLib = async (id: string) => {
		const { data, error } = await supabase.from('libs').delete().eq('id', id);
		if (error !== null) throw error;
		return data;
	};

	const getPrompt = (item: Lib, pointer: number) => {
		try {
			return Object.keys(item.parsed_prompts[pointer])[0];
		} catch {
			return '';
		}
	};

	const getPromptDescription = (prompt: string): string => {
		if (!prompt) return '';

		const explanations: { [key: string]: string } = {
			adjective: 'A word that describes something.',
			verb: 'A word that shows action or being.',
			'verb -ing': 'An action ending in -ing: laughing, jumping, etc.',
			'verb -ed': 'An action ending in -ed: laughed, jumped, etc.',
			verbing: 'An action ending in -ing: laughing, jumping, etc.',
			verbed: 'An action ending in -ed: laughed, jumped, etc.',
			'verb with -ing ending': 'An action ending in -ing: laughing.',
			'verb ending in -ed': 'An action ending in -ed: laughed, jumped, etc.',
			'verb ending in ing': 'An action ending in -ing: laughing, jumping, etc.',
			'verb ending in ed': 'An action ending in -ed: laughed, jumped, etc.',
			adverb:
				'A word or phrase that modifies or qualifies an adjective or verb: gently, quite, then, there, etc.',
			'movement verb': 'A verb that describes a movement: run, walk, jumped, etc.',
			noun: 'A thing, something you can see or touch.',
			'Plural Noun': 'Things, something you can see or touch.',
			object: 'A person, place, or thing.',
			'proper noun': 'Name for specific things, people, and places.',
			superlative: 'Superlative: fastest, best, etc.',
			occupation: 'Occupation: job title.',
			profession: 'Profession: job title.',
			place: 'A location: school, garden, etc.',
			name: 'A name: John, Sizzle, Bubbles etc.',
			town: 'The name of a small city: Townsville, Florence, etc.',
			weather: 'The state of the weather at a particular time: rain, wind, etc.',
			emotion: 'A feeling: sad, happy, cheerful, etc.',
			material: 'What something is made of: sand, wood, etc.',
			sound:
				'A noise or auditory event that can be heard, such as ring, boom, quack etc.',
			subject: 'What we learn or teach.',
			'historical figure': 'Someone from the past who did something important.',
			'book name': 'What a book is called.',
			destination: 'Where someone or something is going.',
			snack: 'A small amount of food.',
			'book genre': 'A type of book.',
			food: 'What we eat to live and grow.',
			beverage: 'Something we drink that is not water.',
			instrument: 'A tool, often for science.',
			festival: 'A special time of celebration.',
			superhero: 'A made-up hero with special powers.',
			villain: 'A bad character in a story.',
			animal: 'A living organism: cat, elephant, etc.',
			'animal plural': 'A group of the same animals.',
			'noun plural': 'More than one person, place, or thing.',
			ingredient: 'What is used to make a dish.',
			spice: 'Something used to give flavor to food.',
			city: 'A big place where lots of people live.',
			color: 'What we see like red, blue, or yellow.',
			'dog breed': 'A type of dog: labrador, chihuahua, poodle.',
			'cooking technique': 'A way to prepare food: frying, baking, boiling.',
			dish: 'A specific food; pasta, soup, cake.',
			'kitchen appliance': 'A tool for preparing food; toaster, blender.',
			topic: 'Anything you can talk about; weather, videogames.',
			'last name': 'A family name: Smith, Jones etc.',
			surname: 'A family name: Smith, Jones etc.',
			'feminine name': 'A name traditionally given to a female person',
			'female name': 'A name traditionally given to a female person',
			'pet animal': 'An animal kept for companionship: dog, cat, horse etc.',
			number: 'A numerical value used to represent quantity: 1, twenty, 83, etc.',
			'body part': 'A physical part of a living organism: arm, leg, etc.',
			'body parts': 'Parts of a living organism: arms, legs, etc.',
			'body part plural': 'Parts of a living organism: arms, legs, etc.',
			'cooking Technique -ing ending':
				'A method of preparing food: grilling, roasting etc.',
			year: 'A period of 365 days: 2023, 1776, etc.',
			'superlative Adjective':
				'Describes the highest degree of a quality: brightest, strongest, etc.',
			relative: 'A family member: mother, uncle, etc.',
			country:
				'A nation with its own government and territory: USA, Canada, Norway, etc.',
			'word beginning with N': 'Any word starting with the letter N.',
			'word beginning with A': 'Any word starting with the letter A.',
			'word beginning with S': 'Any word starting with the letter S.',
			tool: 'An instrument or device used to perform a task: hammer, saw, etc.',
			'type of car': 'A specific brand of car: Ford, Tesla, etc.',
			car: 'A specific brand of car: Ford, Tesla, etc.',
			Ability: 'Skill or power, often magical: invisibility, flight, etc.',
			'Random Word': 'Any word, sometimes unpredictable or fictional.',
		};

		prompt = prompt.replace(/[0-9]/g, '');
		const baseForm = nlp(prompt).out('root' as any);

		let closestKey = '';
		let minDistance = Infinity;

		for (const key in explanations) {
			if (key.includes(baseForm)) {
				const distance = levenshteinDistance(baseForm, key);
				if (distance < minDistance) {
					minDistance = distance;
					closestKey = key;
				}
			}
		}

		return explanations[closestKey] || ' ';
	};

	const parseTextToLib = (text: string) => {
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

		return { parsed_text, parsed_prompts };
	};

	const parseLibToText = (lib: any) => {
		let result = '';
		lib.parsed_text.map((text: string, index: number) => {
			if (index % 2 === 0) result += text;
			if (index % 2 !== 0) {
				let highlighted_word = text;
				if (lib.user_input) {
					try {
						for (let i = 0; i < lib.parsed_prompts.length; i++) {
							if (
								lib.parsed_prompts[i][Object.keys(lib.parsed_prompts[i])[0]].includes(
									index,
								)
							) {
								highlighted_word = lib.user_input[i];
								break;
							}
						}
					} catch (error) {}
				}
				result += highlighted_word;
			}
		});
		return result;
	};

	return {
		parseTextToLib,
		parseLibToText,
		getPromptDescription,
		getPrompt,
		uploadLib,
		deleteLib,
	};
}
