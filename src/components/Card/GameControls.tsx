import { useState, useEffect } from "react";
import { View, YStack, XStack, Input, Button, SizableText, Progress } from "tamagui";
import useGameLogic from "../../hooks/useGameLogic";

export default function GameControls(props: any) {
    const { item } = props;

    const [input, setInput] = useState("");

    const { prompt, description, percentageCompleted, userInputs, pointer, forward, backward } = useGameLogic(item);

    useEffect(() => {
        setInput(userInputs[pointer] || "");
    }, [pointer, userInputs]);

    const handleBackward = () => {
        backward(input);
    }

    const handleFoward = () => {
        forward(input);
    }

    return (
        <View >
            <YStack gap={4}>
                <XStack gap={8}>
                    <Input
                        flex={1}
                        onChangeText={input => setInput(input)}
                        value={input}
                        placeholder={prompt}>
                    </Input>
                    <Button variant="outlined" onPress={handleBackward}>Undo</Button>
                    <Button backgroundColor={'$main4'} onPress={handleFoward}>Go</Button>
                </XStack>
                <SizableText>{description}</SizableText>
                <Progress size={'$2'} value={percentageCompleted} >
                    <Progress.Indicator backgroundColor={'$main8'} />
                </Progress>
            </YStack>
        </View >
    )
}