import { Text, SizableText, ScrollView, View } from "tamagui";
import { Lib } from "./Lib";

interface HighlightedTextProps {
    item: Lib,
    // A component that appears within the scrollview, after the text
    endComponent?: React.ReactNode,
}

export default function HighlightedText(props: HighlightedTextProps) {
    const { item, endComponent } = props;

    return (
        <View flex={1}>
            <ScrollView>
                <Text marginVertical={4} >
                    {item.parsed_text.map((text: string, index: number) => {
                        if (index % 2 === 0) return (<SizableText key={index} size={'$5'} fontWeight={400} lineHeight={32}>{text}</SizableText>);
                        if (index % 2 !== 0) {
                            let highlighted_word = text;
                            if (item.user_input) {
                                try {
                                    for (let i = 0; i < item.parsed_prompts.length; i++) {
                                        if (item.parsed_prompts[i][Object.keys(item.parsed_prompts[i])[0]].includes(index)) {
                                            highlighted_word = item.user_input[i] || Object.keys(item.parsed_prompts[i])[0];
                                            break;
                                        }
                                    }
                                } catch (error) {

                                }
                            }
                            return (<SizableText key={index} size={'$5'} fontWeight={400} color={'$main11'} lineHeight={32}>{highlighted_word}</SizableText>);
                        }
                    })}
                </Text>
                {endComponent}
            </ScrollView>
        </View>
    );
}