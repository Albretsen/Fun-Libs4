import { Button } from "tamagui";

interface ActionButtonProps {
    icon: any;
    label: string;
    callbackFn?: () => void;
}

export default function ActionButton(props: ActionButtonProps) {
    const { icon, label, callbackFn } = props;

    return (
        <Button onPress={callbackFn} icon={icon} scaleIcon={1.4} flexDirection="column" backgroundColor="$colorTransparent" space={'unset'} >
            {label}
        </Button>
    )
}