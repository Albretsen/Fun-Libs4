import { useTheme, View, XStack } from "tamagui";
import { Heart, Share, User, RotateCcw, Save } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import useLib from "../../../hooks/useLib";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import useError from "../../../hooks/useError";
import useLikes from "../../../hooks/useLikes";
import { useLibStore } from "../../../hooks/useLibStore";
import useShare from "../../../hooks/useShare";

interface ActionsProps {
    item?: any,
    variant?: 'play' | 'read' | 'listItem' | 'create',
    onPressSave?: any,
    onPressDelete?: any,
}

export default function Actions(props: ActionsProps) {
    const { item, variant = "read", onPressSave, onPressDelete } = props;

    const { funLibsError } = useError();

    const { shareLib } = useShare();

    const queryClient = useQueryClient();

    const navigation = useNavigation();

    const { deleteLib } = useLib();

    const [loading, setLoading] = useState<boolean>(false);

    const theme = useTheme();

    const { like, likes, liked } = useLikes(item);

    useEffect(() => {
        console.log(liked);
    }, [liked]);

    const restart = () => {
        router.replace("/play/view");
    }

    const save = async () => {
        if (onPressSave) {
            setLoading(true);
            try {
                await onPressSave();
                setLoading(false);
            } catch {
                setLoading(false);
            }
        } else {
            console.log("Not implemented");
        }
    }

    const delete_ = async () => {
        switch (variant) {
            case "play":
                try {
                    router.replace('/');
                    navigation.navigate('Community');
                    await deleteLib(item.id);
                    queryClient.invalidateQueries({ queryKey: ['community_libs'] });
                } catch (error) {
                    funLibsError(error);
                }
                break;
            default:
                console.log("delete not implemented");
        }
    }

    return (
        <View borderWidth={1} borderColor={'$main6'} borderRadius={8} backgroundColor={'$background'} paddingVertical={8}>
            <XStack justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
                {variant === 'create' ? <>
                    <ActionButton label={"Publish"} icon={Save} onPress={save} loading={loading} />
                </> : null}
                {variant === 'play' ? <>
                    <ActionButton label={likes + " " + (likes != 1 ? 'likes' : 'like')} onPress={like} icon={liked ? <Heart fill={theme.color.val} strokeWidth={0} /> : <Heart />} />
                    <ActionButton label={"Profile"} icon={User} />
                </> : null}
                {variant === 'read' ? <>
                    <ActionButton label={"Share"} icon={Share} onPress={() => shareLib(item)} />
                    <ActionButton label={"Try again"} icon={RotateCcw} onPress={restart} />
                </> : null}
                {variant === 'listItem' ? <>
                </> : null}
                {/* {config.like ? <ActionButton label={"28 likes"} icon={Heart} /> : null}
                {config.restart ? <ActionButton label={"Try again"} icon={RotateCcw} onPress={restart} /> : null}
                {config.share ? <ActionButton label={"Share"} icon={Share} /> : null}
                {item?.author === userId ? <ActionButton label={"Edit"} icon={Pen} /> : null}
                {item?.author === userId ? <ActionButton label={"Delete"} icon={Trash} onPress={onPressDelete ? onPressDelete : delete_} /> : null}
                {config.profile ? <ActionButton label={"Profile"} icon={User} /> : null} */}
            </XStack>
        </View>
    )
};