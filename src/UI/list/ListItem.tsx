import { View, Text, SizableText } from "tamagui";

export default function ListItem(props: any) {
    const { item } = props;

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'}>
            <View margin={16} gap={16}>
                <View height={100} backgroundColor={'$main4'} borderRadius={10}>

                </View>
                <View>
                    <SizableText size={'$8'} fontWeight={900}>{item.title}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>by {item.profiles.username}</SizableText>
                </View>
            </View>
        </View>
    )
}