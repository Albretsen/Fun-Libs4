import { View, YStack, XStack, Input, Button, SizableText, Progress } from "tamagui"

export default function GameControls() {
    return (
        <View >
            <YStack gap={4}>
                <XStack gap={8}>
                    <Input flex={1} placeholder="Adjective"></Input>
                    <Button variant="outlined">Undo</Button>
                    <Button backgroundColor={'$main4'}>Go</Button>
                </XStack>
                <SizableText>Adjective: describe something</SizableText>
                <Progress size={'$2'} value={60} >
                    <Progress.Indicator backgroundColor={'$main8'} />
                </Progress>
            </YStack>
        </View>
    )
}