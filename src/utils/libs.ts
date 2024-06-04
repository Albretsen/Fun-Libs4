export default class Lib {
	parsed_text: string[];
	parsed_prompts: any;

	constructor(parsed_text: string[], parsed_prompts: any) {
		this.parsed_text = parsed_text;
		this.parsed_prompts = parsed_prompts;
	}
}
