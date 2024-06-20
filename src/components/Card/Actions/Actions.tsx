import { Button, View, XStack } from "tamagui";
import { Heart, Share, User, RotateCcw } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";

interface ActionsProps {
    item: any,
    variant?: 'play' | 'read' | 'listItem',
}

export default function Actions(props: ActionsProps) {
    const { item, variant = "read" } = props;

    const config = variants[variant];

    return (
        <View borderWidth={1} borderColor={'$main6'} borderRadius={8} height={66} backgroundColor={'$background'}>
            <XStack justifyContent="space-evenly" alignItems="center" flex={1}>
                <ActionButton label={"28 likes"} icon={Heart} />
                {config.restart ?
                    <ActionButton label={"Try again"} icon={RotateCcw} /> : null
                }
                <ActionButton label={"Share"} icon={Share} />
                <ActionButton label={"Profile"} icon={User} />
            </XStack>
        </View>
    )
};

const variants: any = {
    play: {
        restart: false,
    },
    read: {
        restart: true,
    },
    listItem: {
        restart: false,
    }
};