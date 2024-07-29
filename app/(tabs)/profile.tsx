import { Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Button, View, SizableText } from 'tamagui';
import useAuth from '../../src/hooks/useAuth';
import SignUp from '../../src/components/Auth/SignUp';

export default function Tab() {
    const { signOut, session } = useAuth();

    return (
        <>
            {!session?.user.is_anonymous ?
                <StyledContainer>
                    <Text>Tab Profile</Text>
                    <Button onPress={() => signOut()}>Sign out</Button>
                </StyledContainer>
                :
                <StyledContainer >
                    <View gap={8}>
                        <SizableText size={'$5'}>⚠️ Create an account to view your profile!</SizableText>
                        <SignUp />
                    </View>
                </StyledContainer>
            }
        </>
    );
}