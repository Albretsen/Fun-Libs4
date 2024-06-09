import { View, Text, SizableText, XStack, Button, Image } from "tamagui";
import { Heart, Eye } from '@tamagui/lucide-icons';

export default function ListItem(props: any) {
    const { item } = props;

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'}>
            <View margin={16} gap={16}>
                {item.cover ?
                    <Image height={100} source={{
                        uri: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/covers/${item.id}.png`,
                    }} borderRadius={10}>

                    </Image>
                    :
                    <View height={100} backgroundColor={'$main4'} borderRadius={10}>

                    </View>}
                <View>
                    <SizableText size={'$8'} fontWeight={900}>{item.title}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>by {item.profiles.username}</SizableText>
                </View>
                <View>
                    <XStack justifyContent="space-between">
                        <XStack gap={16}>
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