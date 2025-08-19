import { useState, useEffect } from "react";
import { View, YStack, XStack, Input, Button, SizableText, Progress } from "tamagui";
import { TouchableOpacity } from "react-native";
import useGameLogic from "../../hooks/useGameLogic";
import { Wand2, ArrowBigLeft, ArrowBigRight } from "@tamagui/lucide-icons";
import useLib from "../../hooks/useLib";

export default function GameControls(props: any) {
    const { item } = props;

    const [input, setInput] = useState("");

    const { prompt, description, percentageCompleted, userInputs, pointer, forward, backward } = useGameLogic(item);

    const { getPromptFill, hasAvailableFill } = useLib();

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
            <YStack gap={10}>
                <XStack gap={8}>
                    <View flex={1}>
                        <Input
                            paddingRight={36}
                            onChangeText={input => setInput(input)}
                            value={input}
                            // Regex removes trailing numbers from prompt
                            placeholder={prompt.replace(/\d+$/, '')}
                        />
                        {hasAvailableFill(prompt) && (
                            <TouchableOpacity hitSlop={16} onPress={handleFill} style={{
                                position: "absolute",
                                right: 8,
                                top: 11
                            }}>
                                <Wand2 scale={0.75} />
                            </TouchableOpacity>
                        )}
                    </View>
                </XStack>
                <XStack gap={14}>
                    <Button flex={1} icon={<ArrowBigLeft {...props} size={20} />} variant="outlined" onPress={handleBackward}>Previous</Button>
                    {/* Necessary to allow the icon to appear after the label */}
                    <Button flex={1} backgroundColor={'$main4'} onPress={handleFoward}>
                        <XStack alignItems="center" justifyContent="center" gap={6}>
                            <SizableText>Next</SizableText>
                            <ArrowBigRight size={20} />
                        </XStack>
                    </Button>
                </XStack>

                <Progress size={'$2'} value={Math.round(percentageCompleted)}>
                    <Progress.Indicator backgroundColor={'$main8'} />
                </Progress>

                <SizableText minHeight={50}>{description}</SizableText>
            </YStack>
        </View >
    )
}