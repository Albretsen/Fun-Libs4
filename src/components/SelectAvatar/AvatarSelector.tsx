import ProfilePicture from "../Card/ProfilePicture";
import { View, ScrollView, Button, } from "tamagui";
import useSocial from "../../hooks/useSocial";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Toast from 'react-native-toast-message';
import { Pressable } from "react-native";

export default function AvatarSelector() {

    const { getSession } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState()
    const { changeAvatar } = useSocial();
    const avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    const switchAvatar = async (avatar_url: string) => {
        const result = await changeAvatar(avatar_url);
        console.log("Change avatar result stringified:");
        console.log(result);
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
                {avatarIds.map((id) => (
                    <Pressable key={id} onPress={() => setSelectedAvatar('https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + id + '.png')}>
                        <ProfilePicture
                            size={90}
                            avatarURL={'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + id + '.png'}
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
                >
                    Cancel
                </Button>
                <Button
                    width={"40%"}
                    borderRadius={15}
                    backgroundColor={'$main7'}
                    color={'$main12'}
                    onPress={() => { changeAvatar(selectedAvatar) }}
                >
                    Save
                </Button>
            </View>
        </View>
    )
}