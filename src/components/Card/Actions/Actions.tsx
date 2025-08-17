import { useTheme, View, XStack } from "tamagui";
import { Heart, Share, User, RotateCcw, Save, Upload } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
import { router } from 'expo-router';
import { useState } from "react";
import useLikes from "../../../hooks/useLikes";
import useShare from "../../../hooks/useShare";
import useAuth from "../../../hooks/useAuth";
import { useProfileStore } from "../../../hooks/useProfileStore";
import EditLibAction from "./EditLibAction";
import DeleteLibAction from "./DeleteLibButton";

interface ActionsProps {
    item?: any,
    variant?: 'play' | 'read' | 'listItem' | 'create' | 'edit',
    onPressSave?: any,
    onPressDelete?: any,
}

export default function Actions(props: ActionsProps) {
    const { item, variant = "read", onPressSave, onPressDelete } = props;

    const { shareLib } = useShare();

    const { session } = useAuth();
    const { setProfileUserId } = useProfileStore();

    const [loading, setLoading] = useState<boolean>(false);

    const theme = useTheme();

    const { like, likes, liked } = useLikes(item);

    const restart = () => {
        router.replace("/play/view");
    };

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
    };

    const navigateToProfile = () => {
        if (item?.profiles?.id) {
            setProfileUserId(item.profiles.id);
            router.navigate("/public-profile");
        }
    }

    return (
        <View borderWidth={1} borderColor={'$main6'} borderRadius={8} backgroundColor={'$background'} paddingVertical={8}>
            <XStack justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
                {variant === 'create' ? <>
                    <ActionButton label={"Publish"} icon={Upload} onPress={save} loading={loading} />
                </> : null}
                {variant === 'edit' ? <>
                    <ActionButton label={"Save changes"} icon={Save} onPress={save} loading={loading} />
                </> : null}
                {variant === 'play' ? <>
                    <ActionButton label={likes + " " + (likes !== 1 ? 'likes' : 'like')} onPress={like} icon={liked ? <Heart fill={theme.color.val} strokeWidth={0} /> : <Heart />} />
                    <ActionButton label={"Profile"} icon={User} onPress={navigateToProfile} />

                    {session && session.user.id === item.profiles.id ? (
                        <>
                            <EditLibAction lib={item} variant='actionButton' />
                            <DeleteLibAction lib={item} variant='actionButton' />
                        </>
                    ) : null}

                </> : null}
                {variant === 'read' ? <>
                    <ActionButton label={"Share"} icon={Share} onPress={() => shareLib(item)} />
                    <ActionButton label={"Try again"} icon={RotateCcw} onPress={restart} />
                </> : null}
                {variant === 'listItem' ? <>
                </> : null}
            </XStack>


        </View>
    );
}
