import { StyledContainer } from "../../src/styles/styles";
import { View, Input, Button, Spinner, SizableText } from "tamagui";
import Header from "../../src/components/Header";
import { useState, useEffect } from "react";
import useAuth from "../../src/hooks/useAuth";
import { Linking } from "react-native";

export default function deleteAccount() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const { signOut, session } = useAuth();

    const [user, setUser] = useState<any>();

    useEffect(() => {
        if (session) {
            setUser(session.user)
        };
    }, [session]);

    async function deleteAccount() {
        Linking.openURL(`mailto:contact@funlibs.app?subject=Delete%20My%20User&body=Please%20delete%20my%20account:%20${user?.user_metadata?.username}.`);
        // setLoading(true);
        // Account deletion logic here
        // setLoading(false);
    }

    return (
        <StyledContainer>
            <Header />
            <View
                gap={10}

            >
                <SizableText fontWeight={500} size={'$8'}>Delete account</SizableText>
                <SizableText>To delete your account, send a mail to:</SizableText>
                <SizableText textDecorationLine="underline" fontWeight={900}>contact@funlibs.app</SizableText>
                <SizableText>The mail needs to contain your username.</SizableText>
                <SizableText>
                    Your account and all your published libs will be deleted within a day. After deletion, the account cannot be recovered.</SizableText>
                <SizableText>You can send a mail manually, or press the button to have a mail automatically filled in for you.</SizableText>
                {/* <Input onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder={`Password`} borderColor={'$main12'} /> */}
                <Button iconAfter={loading ? <Spinner /> : null} backgroundColor={'$main12'} color={'$main2'} width={'100%'} onPress={() => deleteAccount()} >Go to mail and fill in automatically</Button>
            </View>
        </StyledContainer>
    )
}