import DrawerLink from "../Drawer/DrawerLink";
import { useTheme } from "tamagui";
import { UserX } from "@tamagui/lucide-icons";
import { AlertDialog, Button, View, SizableText, XStack } from 'tamagui';
import { useState } from "react";
import { userDeleteAccount } from "../../../userDeleteAccount";

export default function DeleteAccountButton() {
    const theme = useTheme();
    const [isDialogVisible, setDialogVisible] = useState<boolean>(false);
    return (
        <>
            <Button borderColor={'$red6'} backgroundColor={'$red4'} onPress={() => setDialogVisible(true)}>Permanently delete account</Button>

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
                            <SizableText size={'$5'}>Are you sure you want to delete your account? This will also delete all your published stories.</SizableText>
                            <XStack justifyContent="flex-end" marginTop={16}>
                                <Button onPress={() => setDialogVisible(false)} marginRight={8}>Cancel</Button>
                                <Button borderColor={'$red6'} backgroundColor={'$red4'} onPress={userDeleteAccount}>Delete</Button>
                            </XStack>
                        </View>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </>
    )
}