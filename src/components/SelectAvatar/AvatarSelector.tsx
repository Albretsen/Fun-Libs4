import ProfilePicture from "../Card/ProfilePicture";
import { View, ScrollView, Button } from "tamagui";

export default function AvatarSelector() {

    const avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            flex: 1,
        }}>
            <ProfilePicture
                size={100}
                avatarURL='https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/no-avatar.png'
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
                    <ProfilePicture
                        key={id}
                        size={90}
                        avatarURL={'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/' + id + '.png'}
                    />
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
                >
                    Save
                </Button>
            </View>
        </View>
    )
}