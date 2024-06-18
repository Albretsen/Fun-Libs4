import { Text, SizableText, ScrollView, View } from "tamagui";

export default function HighlightedText(props: any) {
    const { item } = props;

    return (
        <View flex={1}>
            <ScrollView>
                <Text marginVertical={4} >
                    {item.parsed_text.map((text: string, index: number) => {
                        if (index % 2 === 0) return (<SizableText size={'$5'} fontWeight={400} lineHeight={32}>{text}</SizableText>);
                        if (index % 2 !== 0) {
                            let highlighted_word = text;
                            if (item.user_input) {
                                //highlighted_word = item.user_input[Math.floor(index / 2)];
                                try {
                                    for (let i = 0; i < item.parsed_prompts.length; i++) {
                                        if (item.parsed_prompts[i][Object.keys(item.parsed_prompts[i])[0]].includes(index)) {
                                            highlighted_word = item.user_input[i];
                                            break;
                                        }
                                    }
                                } catch (error) {

                                }
                            }
                            return (<SizableText size={'$5'} fontWeight={400} color={'$main8'} lineHeight={32}>{highlighted_word}</SizableText>);
                        }
                    })}
                </Text>
            </ScrollView>
        </View>
    );
}