import { Link } from "expo-router";
import { View, SizableText } from "tamagui";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DrawerLinkProps {
    icon: ReactNode,
    label: string,
    labelColor?: string,
    onPress: () => void;
}

export default function DrawerLink(props: DrawerLinkProps) {
    const { icon, label, labelColor, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress} style={{
            // flex: 1,
            flexDirection: "row",
            gap: 10,
        }}>
            {icon}
            <SizableText color={labelColor}>{label}</SizableText>
        </TouchableOpacity>
    )
}