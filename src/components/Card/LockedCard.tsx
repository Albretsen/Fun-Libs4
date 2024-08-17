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
import { Lock } from "@tamagui/lucide-icons";

interface CardProps {
    item: any,
    variant: 'listItem' | 'play' | 'read',
}

export default function LockedCard(props: CardProps) {
    const { setLib } = useLibStore();

    const { item, variant } = props;

    const config = variants[variant];

    return (
        <View backgroundColor={'$main2'} borderRadius={10} borderColor={'$main6'} flex={config.text ? 1 : 0} >
            <View margin={16} gap={16} flex={config.text ? 1 : 0}>
                <CoverImage item={item} />
                <XStack gap={16}>
                    <Image height={48} width={48} backgroundColor={'$main6'} objectFit="contain" source={{
                        uri: item.profiles.avatar_url ? item.profiles.avatar_url : 'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/no-avatar.png',
                    }} borderRadius={1000}></Image>
                    <View>
                        <SizableText size={'$8'} fontWeight={900}>{item.title}</SizableText>
                        <SizableText size={'$4'} fontWeight={400}>by {item.profiles.username}</SizableText>
                    </View>
                </XStack>
                {config.separator ? <Separator /> : null}
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
                <Lock size={48} color={"$main12"} />
            </View>
        </View>
    )
}

const variants: any = {
    listItem: {
        stats: true,
        playButton: true,
        separator: false,
        gameControls: false,
        text: false,
        actions: false,
    },
    play: {
        stats: false,
        playButton: false,
        separator: true,
        gameControls: true,
        text: false,
        actions: true,
    },
    read: {
        stats: false,
        playButton: false,
        separator: true,
        gameControls: false,
        text: true,
        actions: true,
    }
}