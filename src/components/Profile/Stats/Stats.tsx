import { View } from "tamagui";
import { BookText, Heart, Eye } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import StatBox from "./StatBox";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import SkeletonStatBox from "./SkeletonStatBox";
import { formatNumber } from "../../../utils/format";

interface ProfileStatsProps {
    user: any
}

export default function ProfileStats(props: ProfileStatsProps) {
    const { user } = props;

    const [statBoxData, setStatBoxData] = useState<[{ iconComponent: ReactNode, text: string }] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [libsResult, viewsResult, likesResult] = await Promise.all([
                countLibs(),
                countViews(),
                countLikes()
            ]);

            setStatBoxData([
                libsResult,
                viewsResult,
                likesResult
            ]);
        };

        fetchData();
    }, [user]);

    const countLibs = async () => {
        const result = await supabase.from('libs').select('*', { count: 'exact' }).eq('author', user.id);

        if (result?.count) {
            const count = result.count;
            return { iconComponent: <BookText />, text: `${count} lib${count !== 1 ? 's' : ''}` };
        }
        return { iconComponent: <BookText />, text: "0 libs" };
    };

    const countViews = async () => {
        const result = await supabase.from('libs').select('plays').eq('author', user.id);

        let total = 0;
        if (result?.data) {
            result.data.forEach(element => {
                total += element.plays;
            });
        }

        return { iconComponent: <Eye />, text: `${formatNumber(total)} play${total !== 1 ? 's' : ''}` };
    };

    const countLikes = async () => {
        const libsResult = await supabase.from('libs').select('id').eq('author', user.id);

        if (libsResult?.data?.length > 0) {
            const libIds = libsResult.data.map(lib => lib.id);

            const likesResult = await supabase.from('likes').select('*', { count: 'exact' }).in('lib_id', libIds);

            if (likesResult?.count) {
                const count = likesResult.count;
                return { iconComponent: <Heart />, text: `${formatNumber(count)} like${count !== 1 ? 's' : ''}` };
            }
        }

        return { iconComponent: <Heart />, text: "0 likes" };
    };

    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10
        }}>
            {statBoxData && statBoxData.length > 0 ? statBoxData.map((elem, i) => {
                return <StatBox iconComponent={elem.iconComponent} text={elem.text} id={i} key={i} />
            }) :
                <>
                    <SkeletonStatBox />
                    <SkeletonStatBox />
                    <SkeletonStatBox />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    statBox: {

    }
})