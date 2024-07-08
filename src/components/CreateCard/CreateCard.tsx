import { View, SizableText, TextArea, Input } from "tamagui";
import CoverImage from "../Card/CoverImage";
import Separator from "../Card/Separator";
import { useCreateContext } from "../../Contexts/CreateContext";
import useKeyboardVisibility from "../../hooks/useKeyboardVisibility";
import Actions from "../Card/Actions/Actions";
import useLib from "../../hooks/useLib";

export default function CreateCard() {

    const { title, setTitle, body, setBody, setCursorPosition, cursorPosition } = useCreateContext();

    const { uploadLib } = useLib();

    const isKeyboardVisible = useKeyboardVisibility();

    const save = async () => {
        try {
            await uploadLib(title, body);
        } catch (error) {
        }
    }

    const delete_ = async () => {
        try {
            console.log("deleting");
        } catch (error) {
        }
    }

    return (
        <View backgroundColor={'$main2'} borderWidth={1} borderRadius={10} borderColor={'$main6'} flex={1} marginBottom={16}>
            <View margin={16} gap={16} flex={1}>
                <CoverImage />
                <View>
                    <Input value={title} onChangeText={(text) => setTitle(text)} size={'$8'} placeholder="Title..." placeholderTextColor={'$placeholder'} color={'$main12'} padding={0} margin={0} height={'auto'} backgroundColor={'transparent'} borderWidth={0} fontWeight={'900'}></Input>
                    <SizableText size={'$4'} fontWeight={400}>by you</SizableText>
                </View>
                <Separator />
                <TextArea value={body} onChangeText={(text) => setBody(text)} selection={cursorPosition} onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection)} flex={1} placeholderTextColor={'$placeholder'} multiline={true} verticalAlign={'top'} placeholder="Text here..." backgroundColor={'transparent'} borderWidth={0} paddingTop={0} paddingHorizontal={0} alignItems={"flex-start"} />
            </View>
            {isKeyboardVisible ? null : <Actions variant="create" onPressSave={save} onPressDelete={delete_} />}
        </View>
    )
}