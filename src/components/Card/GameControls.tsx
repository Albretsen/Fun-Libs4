import { useState, useMemo } from "react";
import { View, YStack, XStack, Input, Button, SizableText, Progress } from "tamagui";
import useLib from "../../hooks/useLib";

export default function GameControls(props: any) {
    const { item } = props;

    const { getPrompt, getPromptDescription } = useLib();

    const [pointer, setPointer] = useState(0);

    const prompt = useMemo(() => getPrompt(item, pointer), [item, pointer, getPrompt]);
    const description = useMemo(() => getPromptDescription(prompt), [prompt, getPromptDescription]);
    const percentageCompleted = useMemo(() => pointer / (item.parsed_prompts.length - 1) * 100, [pointer]);

    const forward = () => {
        if (pointer >= item.parsed_prompts.length - 1) {
            console.log("won")
            return;
        }
        setPointer((prevState) => { return prevState + 1 });
    }

    const backward = () => {
        if (pointer <= 0) return;
        setPointer((prevState) => { return prevState - 1 })
    }

    return (
        <View >
            <YStack gap={4}>
                <XStack gap={8}>
                    <Input flex={1} placeholder={prompt}></Input>
                    <Button variant="outlined" onPress={backward}>Undo</Button>
                    <Button backgroundColor={'$main4'} onPress={forward}>Go</Button>
                </XStack>
                <SizableText>{description}</SizableText>
                <Progress size={'$2'} value={percentageCompleted} >
                    <Progress.Indicator backgroundColor={'$main8'} />
                </Progress>
            </YStack>
        </View >
    )
}