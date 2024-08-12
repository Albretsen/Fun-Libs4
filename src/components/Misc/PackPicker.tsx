import { usePackStore } from "../../hooks/usePackStore";
import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";
import useIAP from "../../hooks/useIAP";
import { AlertDialog, Button, YStack, XStack, View, SizableText } from "tamagui";

export default function PackPicker() {
    useIAP();

    const { setPack, ownedPacks } = usePackStore();

    const changePack = (pack: string | null) => {
        if (ownedPacks?.includes(pack ? pack : "no_pack")) setPack(pack);
        else {

        }
    }

    return (
        <>
            <ScrollableButtons buttons={
                [
                    { label: "🎉 Free", state: "active", onPress: () => { changePack(null) } },
                    { label: "❤️ Romantic", state: ownedPacks?.includes("romance" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("romance") } },
                    { label: "🚀 History", state: ownedPacks?.includes("historic" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("historic") } },
                ]
            } />
            <View gap={8}>
                <SizableText size={'$8'} fontWeight={900}>The Romantic Pack ❤️</SizableText>
                <SizableText size={'$4'} fontWeight={400}>This is a paid pack which unlocks high quality stories with a romantic theme.</SizableText>
            </View>
            <AlertDialog native>
                <AlertDialog.Trigger asChild >
                    <View paddingVertical={16}>
                        <Button borderRadius={100} backgroundColor={'$main4'} width={''}>Buy $1,99</Button>
                    </View>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                    <AlertDialog.Overlay
                        key="overlay"
                        animation="quick"
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <AlertDialog.Content
                        bordered
                        elevate
                        key="content"
                        animation={[
                            'quick',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        x={0}
                        scale={1}
                        opacity={1}
                        y={0}
                    >
                        <YStack space>
                            <AlertDialog.Title>Accept</AlertDialog.Title>
                            <AlertDialog.Description>
                                By pressing yes, you accept our terms and conditions.
                            </AlertDialog.Description>

                            <XStack gap="$3" justifyContent="flex-end">
                                <AlertDialog.Cancel asChild>
                                    <Button>Cancel</Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <Button theme="active">Accept</Button>
                                </AlertDialog.Action>
                            </XStack>
                        </YStack>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </>
    )
}