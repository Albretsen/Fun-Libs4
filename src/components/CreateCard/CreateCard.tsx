import { View, SizableText, TextArea, Input } from "tamagui";
import CoverImage from "../Card/CoverImage";
import Separator from "../Card/Separator";
import { useCreateContext } from "../../Contexts/CreateContext";
import useKeyboardVisibility from "../../hooks/useKeyboardVisibility";
import Actions from "../Card/Actions/Actions";
import useLib from "../../hooks/useLib";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import useError from "../../hooks/useError";

export default function CreateCard() {

    const { title, setTitle, body, setBody, setCursorPosition, cursorPosition } = useCreateContext();

    const { parseTextToLib } = useLib();

    const { funLibsError } = useError();

    const navigation = useNavigation();

    const queryClient = useQueryClient();

    const { uploadLib } = useLib();

    const isKeyboardVisible = useKeyboardVisibility();

    const save = async () => {
        try {
            validate({ ...parseTextToLib(body), title })
            await uploadLib(title, body);
            router.replace('/');
            navigation.navigate('Community');
            queryClient.invalidateQueries({ queryKey: ['community_libs'] });
        } catch (error: unknown) {
            router.replace('/create');
            funLibsError(error);
        }
    }

    const validate = (lib: any) => {
        if (!(lib.title && lib.title.length > 0)) throw Error("Add a title.");
        if (!(lib.parsed_text && lib.parsed_text.length > 0)) throw Error("Add a text.");
        if (!(lib.parsed_prompts && lib.parsed_prompts.length > 0)) throw Error("Add a prompt.");
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
                <TextArea value={body} onChangeText={(text) => setBody(text)} selection={cursorPosition} onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection)} flex={1} placeholderTextColor={'$placeholder'} multiline={true} verticalAlign={'top'} placeholder="In an (Adjective) forest, a man named (Name)..." backgroundColor={'transparent'} borderWidth={0} paddingTop={0} paddingHorizontal={0} alignItems={"flex-start"} />
            </View>
            {isKeyboardVisible ? null : <Actions variant="create" onPressSave={save} onPressDelete={delete_} />}
        </View>
    )
}