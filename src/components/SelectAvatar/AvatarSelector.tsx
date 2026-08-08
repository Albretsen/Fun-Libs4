import ProfilePicture from "../Card/ProfilePicture";
import { View, ScrollView, Button, } from "tamagui";
import useSocial from "../../hooks/useSocial";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Toast from 'react-native-toast-message';
import { Pressable } from "react-native";
import { AVATAR_IDS, AVATAR_LINK } from "../../../settings";
import { useNavigation } from "@react-navigation/native";

export default function AvatarSelector() {

    const { getSession } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState<string>(AVATAR_LINK.prefix + AVATAR_IDS[0] + AVATAR_LINK.postfix)
    const { changeAvatar } = useSocial();
    const navigation = useNavigation();

    const switchAvatar = async (avatar_url: string) => {
        navigation.goBack();
        const result = await changeAvatar(avatar_url);
        if (!result || result.error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error updating avatar, please try again.'
            });
        }
    }

    useEffect(() => {
        const getAvatar = async () => {
            const session = await getSession();
            setSelectedAvatar(session?.user.user_metadata.avatar_url);
        }

        getAvatar();
    }, []);

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            flex: 1,
        }}>
            <ProfilePicture
                size={100}
                avatarURL={selectedAvatar}
            />
            <ScrollView borderRadius={20} contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                padding: 10,
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingBottom: 10,

            }}>
                {AVATAR_IDS.map((id) => (
                    <Pressable key={id} onPress={() => setSelectedAvatar(AVATAR_LINK.prefix + id + AVATAR_LINK.postfix)}>
                        <ProfilePicture
                            size={90}
                            avatarURL={AVATAR_LINK.prefix + id + AVATAR_LINK.postfix}
                        />
                    </Pressable>
                ))}
            </ScrollView>
            <View style={{
                marginBottom: 20,
                marginTop: 10,
                flexDirection: "row",
                gap: 20,
            }}>
                <Button
                    width={"40%"}
                    borderWidth={2}
                    borderColor={'$main6'}
                    borderRadius={15}
                    backgroundColor={'$main1'}
                    color={'$main8'}
                    onPress={() => { navigation.goBack(); }}
                >
                    Cancel
                </Button>
                <Button
                    width={"40%"}
                    borderRadius={15}
                    backgroundColor={'$main7'}
                    color={'$main12'}
                    onPress={() => { switchAvatar(selectedAvatar) }}
                >
                    Save
                </Button>
            </View>
        </View>
    )
}
