export interface Profile {
    id: string;
    username: string;
    avatar_url: string;
    email: string
}

export interface PromptEntry {
    [suggestion: string]: number[];
}

export interface Lib {
    id: number | string;
    author: string;
    title: string;
    parsed_text: string[];
    parsed_prompts: PromptEntry[];
    created_at: string;
    updated_at: string;
    deleted: boolean;
    cover: string;
    plays: number;
    /** Client-side value not fetched from database */
    user_input?: string[];
}

export interface LibWithProfile extends Lib {
    profiles: Profile;
}

export interface LibPack extends Lib {
    pack: string;
}

export interface LibPackWithProfile extends LibPack {
    profiles: Profile | null;
}

export interface FirestoreTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

export interface PushNotificationToken {
    data: string;
    type: string; // likely always "expo"
}

export interface UserAccount {
    id: number;
    date: FirestoreTimestamp | null;
    uid: string;
    likesCount: string; // numeric column returned as string by PostgREST
    memberSince: string;
    avatarID: string; // jsonb-encoded string, e.g. "11"
    color: string;
    bio: string;
    push_notification_token: PushNotificationToken | null;
    email: string;
    username: string;
    libsCount: string; // numeric column returned as string by PostgREST
    firestore_id: string;
    plays: number | null;
    purchases: string[];
    subscription: string[];
}
