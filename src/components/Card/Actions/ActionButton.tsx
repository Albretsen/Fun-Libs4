import { Button } from "tamagui";

interface ActionButtonProps {
    icon: any;
    label: string;
    onPress?: () => void;
}

export default function ActionButton(props: ActionButtonProps) {
    const { icon, label, onPress } = props;

    return (
        <Button onPress={onPress} icon={icon} scaleIcon={1.4} flexDirection="column" backgroundColor="$colorTransparent" space={'unset'} >
            {label}
        </Button>
    )
}