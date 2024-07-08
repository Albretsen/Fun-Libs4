import { View, XStack } from "tamagui";
import { Heart, Share, User, RotateCcw, Save, Trash, Pen } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
import { router } from 'expo-router';
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useLib from "../../../hooks/useLib";

interface ActionsProps {
    item?: any,
    variant?: 'play' | 'read' | 'listItem' | 'create',
    onPressSave?: any,
    onPressDelete?: any,
}

export default function Actions(props: ActionsProps) {
    const { item, variant = "read", onPressSave, onPressDelete } = props;

    const { getSession } = useAuth();

    const { deleteLib } = useLib();

    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        const getUserId = async () => {
            setUserId((await getSession())?.user.id)
        }
        getUserId();
    }, [])

    const config = variants[variant];

    const restart = () => {
        router.replace("/play/view");
    }

    const save = () => {
        console.log("save not implemented");
    }

    const delete_ = async () => {
        switch (variant) {
            case "play":
                try {
                    console.log("Deleting " + item.id);
                    await deleteLib(item.id);
                    console.log("Success");
                } catch (error) {
                    console.log(error);
                }
                break;
            default:
                console.log("delete not implemented");
        }
    }

    return (
        <View borderWidth={1} borderColor={'$main6'} borderRadius={8} backgroundColor={'$background'} paddingVertical={8}>
            <XStack justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
                {config.save ? <ActionButton label={"Save"} icon={Save} onPress={onPressSave ? onPressSave : save} /> : null}
                {config.like ? <ActionButton label={"28 likes"} icon={Heart} /> : null}
                {config.restart ? <ActionButton label={"Try again"} icon={RotateCcw} onPress={restart} /> : null}
                {config.share ? <ActionButton label={"Share"} icon={Share} /> : null}
                {item?.author === userId ? <ActionButton label={"Edit"} icon={Pen} /> : null}
                {item?.author === userId ? <ActionButton label={"Delete"} icon={Trash} onPress={onPressDelete ? onPressDelete : delete_} /> : null}
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