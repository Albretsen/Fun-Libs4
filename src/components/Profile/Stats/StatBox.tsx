import { View, SizableText } from "tamagui"
import { ReactNode } from "react"

interface StatBoxProps {
    iconComponent: ReactNode,
    text: string,
}

export default function StatBox(props: StatBoxProps) {
    const { iconComponent, text } = props;
    return (
        <View
            flex={1}
            // Modify aspect ratio to change box height
            aspectRatio={1.3}
            backgroundColor={'$main2'}
            padding={10}
            borderWidth={1}
            borderRadius={10}
            borderColor={'$main6'}
            justifyContent="center"
        >
            <View alignItems="center" gap={10}>
                {iconComponent}
                <SizableText>{text}</SizableText>
            </View>
        </View>
    )
}