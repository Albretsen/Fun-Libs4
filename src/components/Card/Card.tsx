import { View, Text, SizableText, XStack, Button } from "tamagui";
import CoverImage from "./CoverImage";
import Stats from "./Stats";
import { Link } from "expo-router";

interface CardProps {
    item: any,
    variant: 'listItem' | 'play',
}

export default function Card(props: CardProps) {
    const { item, variant } = props;

    const config = variants[variant];

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'}>
            <View margin={16} gap={16}>
                <CoverImage item={item} />
                <View>
                    <SizableText size={'$8'} fontWeight={900}>{item.title}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>by {item.profiles.username}</SizableText>
                </View>
                {config.stats && config.playButton ? <View>
                    <XStack justifyContent="space-between">
                        <Stats item={item} />
                        <View>
                            <Link href={{
                                pathname: "/play/view/[id]",
                                params: { id: 'bacon' }
                            }} asChild>
                                <Button borderRadius={100} backgroundColor={'$main4'}> Play </Button>
                            </Link>
                        </View>
                    </XStack>
                </View> : null}
            </View>
        </View>
    )
}

const variants: any = {
    listItem: {
        stats: true,
        playButton: true,
    },
    play: {
        stats: false,
        playButton: false,
    }
}