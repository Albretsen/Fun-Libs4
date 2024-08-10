import { View } from "tamagui";
import { BookText, Heart, Eye } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import StatBox from "./StatBox";

interface StatsProps {

}

export default function Stats() {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10
        }}>
            <StatBox iconComponent={<BookText />} text="14 libs" />
            <StatBox iconComponent={<Heart />} text="63 likes" />
            <StatBox iconComponent={<Eye />} text="1k views" />
        </View>
    )
}

const styles = StyleSheet.create({
    statBox: {

    }
})