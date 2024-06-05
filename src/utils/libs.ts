export default class Lib {
	title: string;
	parsed_text: string[];
	parsed_prompts: any;

	constructor(data: any) {
		this.parsed_text = data.parsed_text;
		this.parsed_prompts = data.parsed_prompts;
		this.title = data.tile;
	}
}
