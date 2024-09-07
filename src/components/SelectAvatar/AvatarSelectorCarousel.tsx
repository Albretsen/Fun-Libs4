import ProfilePicture from "../Card/ProfilePicture";
import { AVATAR_IDS } from "../../../settings";
import { XStack, View, ScrollView } from "tamagui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dispatch, SetStateAction } from "react";

interface AvatarSelectorCarouselProps {
    setAvatar: Dispatch<SetStateAction<number>>;
    avatar: number;
}

export default function AvatarSelectorCarousel(props: AvatarSelectorCarouselProps) {
    const { setAvatar, avatar } = props;

    return (
        <ScrollView horizontal={true} scrollbarWidth="none" showsHorizontalScrollIndicator={false}>
            <XStack gap={8} alignItems="center" >
                {AVATAR_IDS.map((index) => {
                    return (
                        <TouchableOpacity onPress={() => setAvatar(index)} key={index}>
                            <ProfilePicture
                                size={index == avatar ? 70 : 50}
                                avatarURL={'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + index + '.png'}
                            />
                        </TouchableOpacity>
                    )
                })}
            </XStack>
        </ScrollView>
    )
}