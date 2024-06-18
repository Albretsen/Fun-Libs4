import { View, SizableText, XStack, Button } from "tamagui";
import CoverImage from "./CoverImage";
import Stats from "./Stats";
import { Link } from "expo-router";
import Separator from "./Separator";
import GameControls from "./GameControls";
import Actions from "./Actions";
import { useLibStore } from "../../hooks/useLibStore";
import HighlightedText from "./HighlightedText";

interface CardProps {
    item: any,
    variant: 'listItem' | 'play' | 'read',
}

export default function Card(props: CardProps) {
    const { setLib } = useLibStore();

    const { item, variant } = props;

    const config = variants[variant];

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'} flex={config.text ? 1 : 0} marginBottom={16}>
            <View margin={16} gap={16} flex={config.text ? 1 : 0}>
                <CoverImage item={item} />
                <View>
                    <SizableText size={'$8'} fontWeight={900}>{item.title}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>by {item.profiles.username}</SizableText>
                </View>
                {config.separator ? <Separator /> : null}
                {config.text ? <View flex={1} marginTop={-12} marginBottom={-16}><HighlightedText item={item} /></View> : null}
                {config.gameControls ? <GameControls item={item} /> : null}
                {config.playButton ?
                    <View>
                        <XStack justifyContent="space-between">
                            {config.stats ? <Stats item={item} /> : null}
                            {config.playButton ? <Link onPress={() => setLib(item)} href={{
                                pathname: "/play/view",
                            }} asChild>
                                <Button borderRadius={100} backgroundColor={'$main4'}> Play </Button>
                            </Link> : null}
                        </XStack>
                    </View> : null}
            </View>
            {config.actions ? <Actions /> : null}
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