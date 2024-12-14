type ParsedPrompts = {
    [key: string]: number[];
};

export interface Lib {
    id: string,
    author: string,
    title: string,
    parsed_text: string[],
    parsed_prompts: ParsedPrompts[],
    created_at: string,
    updated_at: string,
    deleted: boolean,
    cover: string,
    plays: number,
    profiles?: any,
    user_input?: string[],
}