import { Text, XStack } from "tamagui";
import { Heart, Eye } from "@tamagui/lucide-icons";
import { supabase } from "../../../supabase";
import { useEffect, useState } from "react";

export default function Stats(props: any) {
    const { item } = props;

    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        const getLikes = async () => {
            const result = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('lib_id', item.id);
            if (result?.count) setLikes(result.count);
        }

        getLikes();
    }, [])

    return (
        <XStack gap={16}>
            <XStack gap={4} alignItems={"center"}>
                <Heart />
                <Text>{likes} likes</Text>
            </XStack>
            <XStack gap={4} alignItems={"center"}>
                <Eye />
                <Text>14k plays</Text>
            </XStack>
        </XStack>
    )
}