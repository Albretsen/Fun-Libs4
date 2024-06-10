import { Text, XStack } from "tamagui";
import { Heart, Eye } from "@tamagui/lucide-icons";

export default function Stats(props: any) {
    const { item } = props;

    return (
        <XStack gap={16}>
            <XStack gap={4} alignItems={"center"}>
                <Heart />
                <Text>1k likes</Text>
            </XStack>
            <XStack gap={4} alignItems={"center"}>
                <Eye />
                <Text>14k plays</Text>
            </XStack>
        </XStack>
    )
}