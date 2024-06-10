import { useEffect, useState } from "react";
import { View, YStack, XStack, Input, Button, SizableText, Progress } from "tamagui"

export default function GameControls(props: any) {
    const { item } = props;

    const [pointer, setPointer] = useState(0);

    useEffect(() => {
        console.log(pointer);
        console.log("calc:" + pointer / (item.parsed_prompts.length) * 100);
        console.log(item.parsed_prompts[pointer])
    }, [pointer]);

    const forward = () => {
        setPointer((prevState) => { return prevState + 1 });

        if (pointer >= item.parsed_prompts.length - 1) {
            console.log("won")
            return;
        }
    }

    const backward = () => {
        setPointer((prevState) => { return prevState - 1 })
    }

    return (
        <View >
            <YStack gap={4}>
                <XStack gap={8}>
                    <Input flex={1} placeholder="Adjective"></Input>
                    <Button variant="outlined" onPress={backward}>Undo</Button>
                    <Button backgroundColor={'$main4'} onPress={forward}>Go</Button>
                </XStack>
                <SizableText>Adjective: describe something</SizableText>
                <Progress size={'$2'} value={pointer / (item.parsed_prompts.length) * 100} >
                    <Progress.Indicator backgroundColor={'$main8'} />
                </Progress>
            </YStack>
        </View>
    )
}