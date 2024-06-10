import { Button, View, XStack } from "tamagui";
import { Heart, Share, User } from "@tamagui/lucide-icons";

export default function Actions() {

    return (
        <View borderWidth={1} borderColor={'$main6'} borderRadius={8} height={66} backgroundColor={'$background'}>
            <XStack justifyContent="space-evenly" alignItems="center" flex={1}>
                <Button icon={Heart} scaleIcon={1.4} flexDirection="column" backgroundColor="$colorTransparent" space={0}>
                    28 likes
                </Button>
                <Button icon={Share} scaleIcon={1.4} flexDirection="column" backgroundColor="$colorTransparent" space={0}>
                    Share
                </Button>
                <Button icon={User} scaleIcon={1.4} flexDirection="column" backgroundColor="$colorTransparent" space={0}>
                    Profile
                </Button>
            </XStack>
        </View>
    )
}