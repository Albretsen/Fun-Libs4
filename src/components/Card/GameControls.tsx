import { useState, useEffect } from "react";
import { View, YStack, XStack, Input, Button, SizableText, Progress } from "tamagui";
import { TouchableOpacity } from "react-native";
import useGameLogic from "../../hooks/useGameLogic";
import { Wand2 } from "@tamagui/lucide-icons";
import useLib from "../../hooks/useLib";

export default function GameControls(props: any) {
    const { item } = props;

    const [input, setInput] = useState("");

    const { prompt, description, percentageCompleted, userInputs, pointer, forward, backward } = useGameLogic(item);

    const { getPromptFill } = useLib();

    useEffect(() => {
        setInput(userInputs[pointer] || "");
    }, [pointer, userInputs]);

    const handleBackward = () => {
        backward(input);
    }

    const handleFoward = () => {
        forward(input);
    }

    const handleFill = () => {
        setInput(getPromptFill(prompt))
    }

    return (
        <View >
            <YStack gap={4}>
                <XStack gap={8}>
                    <View flex={1}>
                        <Input
                            paddingRight={36}
                            onChangeText={input => setInput(input)}
                            value={input}
                            placeholder={prompt}
                        />
                        <TouchableOpacity hitSlop={16} onPress={handleFill} style={{
                            position: "absolute",
                            right: 8,
                            top: 11
                        }}>
                            <Wand2 scale={0.75} />
                        </TouchableOpacity>
                    </View>
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