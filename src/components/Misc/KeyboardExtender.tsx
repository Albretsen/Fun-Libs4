import { Button, ScrollView, View, XStack } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import useKeyboardVisibility from "../../hooks/useKeyboardVisibility";

export default function KeyboardExtender() {
    const prompts = ['Adjective', 'Noun', 'Name', 'Verb (-ing ending)'];

    const isKeyboardVisible = useKeyboardVisibility();

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderColor={'$main6'} display={isKeyboardVisible ? 'flex' : 'none'}>
            <ScrollView horizontal={true} keyboardShouldPersistTaps='handled'>
                <XStack flex={1}>
                    {prompts.map((value) => {
                        return (<XStack flex={1}><Button icon={Plus} backgroundColor={'transparent'} borderRadius={0}>{value}</Button><View width={1} height={'60%'} backgroundColor={'$main7'} alignSelf="center" /></XStack>)
                    })}
                </XStack>
            </ScrollView>
        </View>
    )
}