import { Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Stack } from 'expo-router';

export default function Tab() {
    return (
        <StyledContainer>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <Text>Tab Profile</Text>
        </StyledContainer>
    );
}