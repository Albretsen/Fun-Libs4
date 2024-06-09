import { View, Text, SizableText, XStack, Button } from "tamagui";
import { Heart, Eye } from '@tamagui/lucide-icons'

export default function ListItem(props: any) {
    const { item } = props;

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'}>
            <View margin={16} gap={16}>
                <View height={100} backgroundColor={'$main4'} borderRadius={10}>

                </View>
                <View>
                    <SizableText size={'$8'} fontWeight={900}>{item.title}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>by {item.profiles.username}</SizableText>
                </View>
                <View>
                    <XStack flex={1} justifyContent="space-between">
                        <XStack flex={1} gap={16}>
                            <XStack gap={4} alignItems={"center"}>
                                <Heart />
                                <Text>1k likes</Text>
                            </XStack>
                            <XStack gap={4} alignItems={"center"}>
                                <Eye />
                                <Text>14k plays</Text>
                            </XStack>
                        </XStack>
                        <View>
                            <Button borderRadius={100} backgroundColor={'$main4'}> Play </Button>
                        </View>
                    </XStack>
                </View>
            </View>
        </View>
    )
}