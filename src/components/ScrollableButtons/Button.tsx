import { Button as TamaguiButton } from "tamagui"
import { Check, LockKeyhole } from "@tamagui/lucide-icons"
import { ReactNode } from "react";

interface ButtonProps {
    state: "active" | "inactive" | "locked";
    label: string;
    onPress: () => void;
}

export default function Button({ state, label, onPress }: ButtonProps) {
    let backgroundColor: string;
    let outlineColor: string;
    let icon: ReactNode | null;

    if (state == "active") {
        backgroundColor = "$main4";
        outlineColor = "$main4";
        icon = <Check />;
    }
    else if (state == "inactive") {
        backgroundColor = "$main2";
        outlineColor = "$main6";
        icon = null;
    }
    else {
        backgroundColor = "$main2";
        outlineColor = "$main6";
        icon = <LockKeyhole />;
    }
    return (
        <TamaguiButton onPress={onPress} size={"$3"} backgroundColor={backgroundColor} borderColor={outlineColor} fontSize={13} icon={icon} borderRadius={50}>{label}</TamaguiButton>
    )
}