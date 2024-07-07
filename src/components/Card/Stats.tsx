import { Text, XStack, useTheme } from "tamagui";
import { Heart, Eye } from "@tamagui/lucide-icons";
import { supabase } from "../../../supabase";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useSocial from "../../hooks/useSocial";

export default function Stats(props: any) {
    const { item } = props;

    const { getSession } = useAuth();
    const theme = useTheme();
    const { addLike, removeLike } = useSocial();

    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        getLikes();
    }, []);

    const getLikes = async () => {
        const result = await supabase.from('likes').select('*', { count: 'exact' }).eq('lib_id', item.id);
        let session = await getSession();
        if (session && 'user' in session && session.user?.id) {
            result.data?.forEach(async (item_) => {
                if (item_.user_id && item_.user_id === session.user.id) {
                    setLiked(true);
                }
            });
        }
        if (result?.count) setLikes(result.count);
    };

    const like = async () => {
        if (!liked) {
            setLiked(true);
            setLikes(likes + 1);
            let result = await addLike(item.id);
            if (result.error != null) {
                setLikes(likes);
                setLiked(false);
            }
        } else {
            setLiked(false);
            setLikes(likes - 1);
            let result = await removeLike(item.id);
            if (result.error != null) {
                setLikes(likes);
                setLiked(true);
            }
        }
    }

    return (
        <XStack gap={16}>
            <XStack gap={4} alignItems={"center"} onPress={like}>
                {liked ? <Heart fill={theme.color.val} strokeWidth={0} /> : <Heart />}
                <Text>{likes} likes</Text>
            </XStack>
            <XStack gap={4} alignItems={"center"}>
                <Eye />
                <Text>14k plays</Text>
            </XStack>
        </XStack>
    )
}