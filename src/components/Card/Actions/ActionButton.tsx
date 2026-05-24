import { Button } from "tamagui";
import { Spinner } from "tamagui";

interface ActionButtonProps {
    icon: any;
    label: string;
    onPress?: () => void;
    loading?: boolean;
}

export default function ActionButton(props: ActionButtonProps) {
    const { icon, label, onPress, loading } = props;

    return (
        <Button onPress={onPress} icon={loading ? <Spinner color={'$main12'} /> : icon} scaleIcon={1.4} flexDirection="column" backgroundColor="$colorTransparent" space={'unset'} >
            {label}
        </Button>
    )
}