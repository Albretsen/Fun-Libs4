import { View, SizableText, TextArea, Input } from "tamagui";
import CoverImage from "../Card/CoverImage";
import Separator from "../Card/Separator";

interface CardProps {
    item: any,
}

export default function CreateCard(props: CardProps) {
    const { item } = props;

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'} flex={1} marginBottom={16}>
            <View margin={16} gap={16} flex={1}>
                <CoverImage item={item} />
                <View>
                    <Input size={'$8'} placeholder="Title..." placeholderTextColor={'$placeholder'} color={'$main12'} padding={0} margin={0} height={'auto'} backgroundColor={'transparent'} borderWidth={0} fontWeight={'900'}></Input>
                    <SizableText size={'$4'} fontWeight={400}>by you</SizableText>
                </View>
                <Separator />
                <TextArea flex={1} placeholderTextColor={'$placeholder'} multiline={true} verticalAlign={'top'} placeholder="Text here..." backgroundColor={'transparent'} borderWidth={0} paddingTop={0} paddingHorizontal={0} alignItems={"flex-start"} />
            </View>
        </View>
    )
}