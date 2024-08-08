import { ScrollView, View, XStack } from "tamagui"
import Button from "./Button"

export default function ScrollableButtons(props) {
    const { buttons } = props;

    return (
        <View style={{ marginBottom: 16 }}>
            <ScrollView horizontal>
                <XStack gap={16}>
                    {buttons ? buttons.map((element, index: number) => {
                        return <Button label={element.label} state={element.state} key={index} />
                    }) : null}
                </XStack>
            </ScrollView>
        </View>
    )
}