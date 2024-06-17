import { Text, SizableText, ScrollView, View } from "tamagui";

export default function HighlightedText(props: any) {
    const { item } = props;

    return (
        <View flex={1}>
            <ScrollView>
                <Text marginVertical={4} >
                    {item.parsed_text.map((item: string, index: number) => {
                        if (index % 2 === 0) return (<SizableText size={'$5'} fontWeight={400} lineHeight={32}>{item}</SizableText>);
                        if (index % 2 !== 0) return (<SizableText size={'$5'} fontWeight={400} color={'$main8'} lineHeight={32}>{item}</SizableText>);
                    })}
                </Text>
            </ScrollView>
        </View>
    );
}