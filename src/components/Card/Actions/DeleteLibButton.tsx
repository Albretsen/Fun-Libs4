import useLib from "../../../hooks/useLib";
import { router } from 'expo-router';
import { useState } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlertDialog, Button } from 'tamagui';
import useError from "../../../hooks/useError";
import { XStack, View, SizableText } from "tamagui";
import { Pressable } from "react-native";
import { Lib } from "../Lib";
import ActionButton from "./ActionButton";
import { Trash } from "@tamagui/lucide-icons";

interface DeleteLibActionProps {
    lib: Lib,
    variant: 'cardButton' | 'actionButton'
}

export default function DeleteLibAction({ lib, variant }: DeleteLibActionProps) {

    const queryClient = useQueryClient();

    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogVisible, setDialogVisible] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const { funLibsError } = useError();

    const { deleteLib } = useLib();

    const handleDelete = async () => {
        try {
            router.replace('/');
            navigation.navigate('Community');
            await deleteLib(lib.id);
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

    return (
        <>
            {variant === 'actionButton' ? <>
                <ActionButton label={"Delete"} icon={Trash} onPress={() => setDialogVisible(true)} />
            </> : null}
            {variant === 'cardButton' ? <>
                <Button onPress={() => setDialogVisible(true)} width={38} height={36} borderRadius={10} borderWidth={1} borderColor={'$main6'} backgroundColor={'$main4'}>
                    <Trash scale={0.9} />
                </Button>
            </> : null}


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
                            <SizableText size={'$5'}>Are you sure you want to delete this story?</SizableText>
                            <XStack justifyContent="flex-end" marginTop={16}>
                                <Button onPress={handleCancel} marginRight={8}>Cancel</Button>
                                <Button borderColor={'$red6'} backgroundColor={'$red4'} onPress={handleDelete}>Delete</Button>
                            </XStack>
                        </View>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </>
    )
}