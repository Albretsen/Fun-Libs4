import { useCreateContext } from "../../../Contexts/CreateContext";
import useLib from "../../../hooks/useLib";
import { Lib } from "../Lib";
import { router } from 'expo-router';
import { PenLine } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
import { Button } from "tamagui";

interface EditLibActionProps {
    lib: Lib,
    variant: 'cardButton' | 'actionButton'
}

export default function EditLibAction({ lib, variant }: EditLibActionProps) {

    const { setTitle, setBody, setId, setEditing } = useCreateContext();

    const { reconstructLibText } = useLib();

    const editLib = () => {
        setId(lib.id);
        setTitle(lib.title);
        setBody(reconstructLibText({
            parsed_text: lib.parsed_text,
            parsed_prompts: lib.parsed_prompts
        }));
        setEditing(true);
        router.push("/create");
    }

    return (
        <>
            {variant === 'actionButton' ? <>
                <ActionButton label={"Edit"} icon={PenLine} onPress={editLib} />
            </> : null}
            {variant === 'cardButton' ? <>
                <Button onPress={editLib} width={38} height={36} borderRadius={10} borderWidth={1} borderColor={'$main6'} backgroundColor={'$main4'}>
                    <PenLine scale={0.9} />
                </Button>
            </> : null}
        </>
    )
}