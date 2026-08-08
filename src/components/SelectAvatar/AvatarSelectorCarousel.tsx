import ProfilePicture from "../Card/ProfilePicture";
import { AVATAR_IDS, AVATAR_LINK } from "../../../settings";
import { XStack, ScrollView } from "tamagui";
import { Dispatch, SetStateAction } from "react";
import { Pressable } from "react-native";

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
                        <Pressable onPress={() => setAvatar(index)} key={index}>
                            <ProfilePicture
                                size={index == avatar ? 70 : 50}
                                avatarURL={AVATAR_LINK.prefix + index + AVATAR_LINK.postfix}
                            />
                        </Pressable>
                    )
                })}
            </XStack>
        </ScrollView>
    )
}
