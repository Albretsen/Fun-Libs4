import { View, SizableText, XStack, Button, useThemeName } from "tamagui";
import CoverImage from "./CoverImage";
import Stats from "./Stats";
import Separator from "./Separator";
import GameControls from "./GameControls";
import Actions from "./Actions/Actions";
import { useLibStore } from "../../hooks/useLibStore";
import HighlightedText from "./HighlightedText";
import { Lock } from "@tamagui/lucide-icons";
import ProfilePicture from "./ProfilePicture";
import LibPreview from "./LibPreview";
import { useTheme } from "tamagui";

interface CardProps {
    item: any,
    variant: 'listItem' | 'play' | 'read',
}

export default function LockedCard(props: CardProps) {
    const { setLib } = useLibStore();

    const { item, variant } = props;

    const config = variants[variant];

    const theme = useTheme();

    return (
        <View backgroundColor={'$main2'} borderRadius={10} borderColor={'$main6'} flex={config.text ? 1 : 0} >
            <View margin={16} gap={16} flex={config.text ? 1 : 0}>
                <CoverImage item={item} />
                <XStack gap={16}>
                    <ProfilePicture avatarURL={item.profiles.avatar_url} />
                    <View>
                        <View style={{
                            flex: 1,
                        }}>
                            <SizableText style={{ width: "100%" }} numberOfLines={2} ellipsizeMode="tail" size={'$6'} fontWeight={900}>{item.title}</SizableText>
                            <SizableText style={{ width: "100%" }} numberOfLines={1} ellipsizeMode="tail" size={'$4'} fontWeight={400}>
                                by
                                <SizableText size={'$4'} fontWeight={900}> {item.profiles.username}</SizableText>
                            </SizableText>
                        </View>
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
                            {config.playButton ? <Button borderRadius={100} backgroundColor={'$main4'}> Play </Button> : null}
                        </XStack>
                    </View> : null}
            </View>
            {config.actions ? <Actions item={item} variant={variant} /> : null}
            <View position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor="rgba(100,100,100,0.2)" justifyContent="center" alignItems="center" borderRadius={10}>
                <View
                    backgroundColor={"$lockBackground"}
                    padding={12}
                    borderRadius={20}
                    marginTop={50}
                >
                    <Lock size={48} />
                </View>
            </View>
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