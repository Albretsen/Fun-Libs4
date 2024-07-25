import { Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Button } from 'tamagui';
import useAuth from '../../src/hooks/useAuth';

export default function Tab() {
    const { signOut } = useAuth();

    return (
        <StyledContainer>
            <Text>Tab Profile</Text>
            <Button onPress={() => signOut()}>Sign out</Button>
        </StyledContainer>
    );
}