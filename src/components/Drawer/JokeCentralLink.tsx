import { SizableText } from "tamagui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";
import CoverImage from "../Card/CoverImage";

export default function JokeCentralLink() {

    const openLink = () => {
        const url = 'https://play.google.com/store/apps/details?id=com.whimsicalworks.jokecentral';
        Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    };

    return (
        <TouchableOpacity onPress={openLink} style={{
            gap: 5,
        }}>
            <CoverImage item={{ id: "joke-central", cover: true }} />
            <SizableText textAlign="center">Having fun with Fun Libs? Tap here to try our newest app, Joke Central!</SizableText>
        </TouchableOpacity>
    )
}