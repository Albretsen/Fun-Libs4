import { View, SizableText, XStack, Button, Image } from "tamagui";
import CoverImage from "./CoverImage";
import Stats from "./Stats";
import { Link } from "expo-router";
import Separator from "./Separator";
import GameControls from "./GameControls";
import Actions from "./Actions/Actions";
import { useLibStore } from "../../hooks/useLibStore";
import HighlightedText from "./HighlightedText";
import { supabase } from "../../../supabase";
import ProfilePicture from "./ProfilePicture";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { useProfileStore } from "../../hooks/useProfileStore";
import LibPreview from "./LibPreview";

type ParsedPrompts = {
    [key: string]: number[];
};
interface Lib {
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
}

interface CardProps {
    item: Lib,
    variant: 'listItem' | 'play' | 'read',
}

export default function Card(props: CardProps) {
    const { setLib } = useLibStore();
    const { setProfileUserId } = useProfileStore();

    const { item, variant } = props;

    const config = variants[variant];

    const navigateToProfile = () => {
        if (item?.profiles?.id) {
            setProfileUserId(item.profiles.id);
            router.navigate("/profile");
        }
    }

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'} flex={config.text ? 1 : 0} >
            <View margin={16} gap={16} flex={config.text ? 1 : 0}>
                <CoverImage item={item} />
                <XStack gap={10}>
                    <Pressable onPress={navigateToProfile}>
                        <ProfilePicture avatarURL={item.profiles.avatar_url} />
                    </Pressable>
                    <View style={{
                        flex: 1,
                    }}>
                        <SizableText style={{ width: "100%" }} numberOfLines={2} ellipsizeMode="tail" size={'$6'} fontWeight={900}>{item.title}</SizableText>
                        <Pressable onPress={navigateToProfile}>
                            <SizableText style={{ width: "100%" }} numberOfLines={1} ellipsizeMode="tail" size={'$4'} fontWeight={400}>
                                by
                                <SizableText size={'$4'} fontWeight={900}> {item.profiles.username}</SizableText>
                            </SizableText>
                        </Pressable>
                    </View>
                </XStack>

                {config.separator ? <Separator /> : null}

                {config.preview ? <LibPreview parsedText={item.parsed_text} /> : null}

                {config.text ? <View flex={1} marginTop={-12} marginBottom={-16}><HighlightedText item={item} /></View> : null}

                {config.gameControls ? <GameControls item={item} /> : null}

                {config.playButton ?
                    <View>
                        <XStack justifyContent="space-between">
                            {config.stats ? <Stats item={item} /> : null}
                            {config.playButton ? <Link onPress={async () => {
                                setLib(item);
                                await supabase.rpc('increment_plays', { p_id: item.id });
                            }} href={{
                                pathname: "/play/view",
                            }} asChild>
                                <Button width={86} height={42} borderRadius={100} borderWidth={1} borderColor={'$main6'} backgroundColor={'$main4'}> Play </Button>
                            </Link> : null}
                        </XStack>
                    </View> : null}
            </View>
            {config.actions ? <Actions item={item} variant={variant} /> : null}
        </View>
    )
}

interface VariantConfig {
    stats: boolean;
    playButton: boolean;
    separator: boolean;
    gameControls: boolean;
    text: boolean;
    actions: boolean;
    preview: boolean;
}

const variants: {
    listItem: VariantConfig;
    play: VariantConfig;
    read: VariantConfig;
} = {
    listItem: {
        stats: true,
        playButton: true,
        separator: false,
        gameControls: false,
        text: false,
        actions: false,
        preview: true,
    },
    play: {
        stats: false,
        playButton: false,
        separator: true,
        gameControls: true,
        text: false,
        actions: true,
        preview: false,
    },
    read: {
        stats: false,
        playButton: false,
        separator: true,
        gameControls: false,
        text: true,
        actions: true,
        preview: false,
    }
}