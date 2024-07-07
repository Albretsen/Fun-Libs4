import { ScrollView, View, XStack } from "tamagui"
import Button from "./Button"

export default function ScrollableButtons() {
    return (
        <View style={{ marginTop: 16 }}>
            <ScrollView horizontal>
                <XStack gap={16}>
                    <Button label="Free" state="active" />
                    <Button label="❤️ Romantic" state="inactive" />
                    <Button label="🚀 History" state="locked" />
                </XStack>
            </ScrollView>
        </View>
    )
}