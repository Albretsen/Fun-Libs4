import DrawerLink from "./DrawerLink";
import { MessageCircleMore } from "@tamagui/lucide-icons";
import { Linking } from "react-native";

export default function DiscordLink() {
    const openDiscord = () => {
        const url = 'https://discord.gg/hWDKrqE4rM';
        Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    };
    return (
        <DrawerLink
            label="Join the Discord"
            icon={<MessageCircleMore scale={0.75} />}
            onPress={openDiscord}
        />
    )
}