import { Pressable } from "react-native";
import Modal from "../Misc/Modal";
import { useState } from "react";
import { SizableText, Button, View, XStack } from "tamagui";
import { ExternalLink as ExternalLinkIcon } from "@tamagui/lucide-icons";
import { Linking } from "react-native";

export default function JokeCentralButton() {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const openJokeCentral = () => {
        const url = 'https://play.google.com/store/apps/details?id=com.whimsicalworks.jokecentral';
        Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    };

    return (
        <>
            <Button scaleIcon={1.2} onPress={() => setModalVisible(true)} iconAfter={ExternalLinkIcon} backgroundColor={'$main4'} borderColor={'$main6'}>Check out Joke Central in the Play Store!</Button>
            <Modal modalVisible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View gap={20} alignItems="center" backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'} padding={15}>
                    <SizableText>This link takes you to the Play Store page for our app Joke Central. Do you wish to continue?</SizableText>
                    <XStack gap={10}>
                        <Button backgroundColor={'$main2'} borderColor={'$main6'} onPress={() => setModalVisible(false)}>
                            No, take me back
                        </Button>
                        <Button backgroundColor={'$main5'} borderColor={'$main6'} onPress={openJokeCentral}>
                            Yes, keep going
                        </Button>
                    </XStack>
                </View>
            </Modal>
        </>
    )
}