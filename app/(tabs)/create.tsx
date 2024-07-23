import { StyledContainer } from '../../src/styles/styles';
import CreateCard from '../../src/components/CreateCard/CreateCard';
import KeyboardExtender from '../../src/components/Misc/KeyboardExtender';
import { View } from 'tamagui';
import { Stack } from 'expo-router';

export default function Tab() {

    return (
        <View flex={1}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StyledContainer>
                <CreateCard />
            </StyledContainer>
            <KeyboardExtender />
        </View>
    );
}