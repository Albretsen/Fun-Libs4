import { StyledContainer } from '../../src/styles/styles';
import { Button, View, SizableText, ScrollView } from 'tamagui';
import useAuth from '../../src/hooks/useAuth';
import SignUp from '../../src/components/Auth/SignUp';
import Header from '../../src/components/Header';
import { useEffect, useState } from 'react';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import { PAGE_SIZE } from '../../settings';
import ProfilePicture from '../../src/components/Card/ProfilePicture';
import CoverImage from '../../src/components/Card/CoverImage';
import ProfileStats from '../../src/components/Profile/Stats/Stats';
import { Link } from 'expo-router';
import { useProfileStore } from '../../src/hooks/useProfileStore';

export default function Tab() {
    const { signOut, session } = useAuth();

    const { user_id } = useProfileStore();

    const [user, setUser] = useState<any>();

    useEffect(() => {
        const getProfile = async () => {
            let tempUser = { user_metadata: {}, id: null };
            const result = await supabase.from('profiles').select().eq('id', user_id).single();
            if (result.data) {
                tempUser.user_metadata = result.data;
                tempUser.id = result.data?.id;
                setUser(tempUser);
            } else {

            }
        };

        getProfile();
    }, [user_id]);

    return (
        <>
            <CoverImage borderRadius={0} height={150} item={{ id: "3", cover: true }} />
            <StyledContainer>
                <Header />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <SizableText style={{ width: "100%" }} numberOfLines={2} ellipsizeMode="tail" size={'$7'} fontWeight={900}>{user?.user_metadata?.username}</SizableText>
                    </View>
                    <ProfilePicture size={60} avatarURL={user?.user_metadata?.avatar_url} />
                </View>
                {/* <Button onPress={() => signOut()}>Sign out</Button> */}
                {user ?
                    <ScrollView >
                        <SizableText style={{ marginVertical: 10 }} size={'$6'} fontWeight={900}>Stats</SizableText>
                        <ProfileStats user={user} />
                        <SizableText style={{ marginVertical: 10 }} size={'$6'} fontWeight={900}>Top libs</SizableText>
                        <List queryKey={"public_profile_libs"} ListItem={Card} queryFn={async (page: number) => {
                            return await supabase.from('libs').select(`*, profiles(*)`).eq("author", user.id).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1).order('plays', { ascending: false });
                        }} />
                    </ScrollView> : null}
            </StyledContainer>
        </>
        // <StyledContainer >
        //     <View gap={8}>
        //         <SizableText size={'$5'}>⚠️ Create an account to view your profile!</SizableText>
        //         <SignUp />
        //     </View>
        // </StyledContainer>
    );
}