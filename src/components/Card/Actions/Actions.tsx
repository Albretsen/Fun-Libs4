import { SizableStack, SizableText, useTheme, View, XStack } from "tamagui";
import { Heart, Share, User, RotateCcw, Save, Trash } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import useLib from "../../../hooks/useLib";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import useError from "../../../hooks/useError";
import useLikes from "../../../hooks/useLikes";
import { useLibStore } from "../../../hooks/useLibStore";
import useShare from "../../../hooks/useShare";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import useAuth from "../../../hooks/useAuth";
import { AlertDialog, Button } from 'tamagui';
import { useProfileStore } from "../../../hooks/useProfileStore";

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
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { deleteLib } = useLib();
    const { session } = useAuth();
    const { setProfileUserId } = useProfileStore();

    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogVisible, setDialogVisible] = useState<boolean>(false);

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

    const confirmDelete = () => {
        setDialogVisible(true);
    };

    const handleDelete = async () => {
        try {
            router.replace('/');
            navigation.navigate('Community');
            await deleteLib(item.id);
            queryClient.resetQueries({ queryKey: ['community_libs'], exact: true });
            queryClient.resetQueries({ queryKey: ['profile_libs'], exact: true });
        } catch (error) {
            funLibsError(error);
        }
        setDialogVisible(false);
    };

    const handleCancel = () => {
        setDialogVisible(false);
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
                    <ActionButton label={"Publish"} icon={Save} onPress={save} loading={loading} />
                </> : null}
                {variant === 'play' ? <>
                    <ActionButton label={likes + " " + (likes !== 1 ? 'likes' : 'like')} onPress={like} icon={liked ? <Heart fill={theme.color.val} strokeWidth={0} /> : <Heart />} />
                    <ActionButton label={"Profile"} icon={User} onPress={navigateToProfile} />
                    {session && session.user.id === item.profiles.id ? <ActionButton label={"Delete"} icon={Trash} onPress={confirmDelete} /> : null}
                </> : null}
                {variant === 'read' ? <>
                    <ActionButton label={"Share"} icon={Share} onPress={() => shareLib(item)} />
                    <ActionButton label={"Try again"} icon={RotateCcw} onPress={restart} />
                </> : null}
                {variant === 'listItem' ? <>
                </> : null}
            </XStack>

            {/* Alert Dialog for Deletion Confirmation */}
            <AlertDialog open={isDialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay
                        key="overlay"
                        opacity={0.9}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <AlertDialog.Content
                        bordered
                        elevate
                        key="content"
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        x={0}
                        scale={1}
                        opacity={1}
                        y={0}
                    >
                        <View padding={16}>
                            <SizableText size={'$5'}>Are you sure you want to delete this item?</SizableText>
                            <XStack justifyContent="flex-end" marginTop={16}>
                                <Button onPress={handleCancel} marginRight={8}>Cancel</Button>
                                <Button borderColor={'$red6'} backgroundColor={'$red4'} onPress={handleDelete}>Delete</Button>
                            </XStack>
                        </View>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </View>
    );
}
