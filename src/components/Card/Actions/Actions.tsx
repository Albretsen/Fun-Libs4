import { View, XStack } from "tamagui";
import { Heart, Share, User, RotateCcw, Save } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
import { router } from 'expo-router';
import { useCreateContext } from "../../../Contexts/CreateContext";
import useLib from "../../../hooks/useLib";

interface ActionsProps {
    item?: any,
    variant?: 'play' | 'read' | 'listItem' | 'create',
}

export default function Actions(props: ActionsProps) {
    const { item, variant = "read" } = props;

    const { parseTextToLib } = useLib();

    const { body } = useCreateContext();

    const config = variants[variant];

    const restart = () => {
        router.replace("/play/view");
    }

    const save = () => {
        console.log(JSON.stringify(parseTextToLib(body)));
    }

    return (
        <View borderWidth={1} borderColor={'$main6'} borderRadius={8} height={66} backgroundColor={'$background'}>
            <XStack justifyContent="space-evenly" alignItems="center" flex={1}>
                {config.save ? <ActionButton label={"Save"} icon={Save} onPress={save} /> : null}
                {config.like ? <ActionButton label={"28 likes"} icon={Heart} /> : null}
                {config.restart ? <ActionButton label={"Try again"} icon={RotateCcw} onPress={restart} /> : null}
                {config.share ? <ActionButton label={"Share"} icon={Share} /> : null}
                {config.profile ? <ActionButton label={"Profile"} icon={User} /> : null}
            </XStack>
        </View>
    )
};

const variants: any = {
    play: {
        restart: false,
        like: true,
        share: true,
        profile: true,
    },
    read: {
        restart: true,
        like: true,
        share: true,
        profile: true,
    },
    listItem: {
        restart: false,
        like: false,
        share: false,
        profile: false,
    },
    create: {
        restart: true,
        like: false,
        share: false,
        profile: false,
        save: true,
    }
};