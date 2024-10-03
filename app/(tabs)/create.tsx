import { Stack } from 'expo-router';
import Header from '../../src/components/Header';
import { View, SizableText } from "tamagui";
import CreateCard from '../../src/components/CreateCard/CreateCard';
import SignUp from '../../src/components/Auth/SignUp';
import { StyledContainer } from '../../src/styles/styles';
import useAuth from '../../src/hooks/useAuth';
import KeyboardExtender from '../../src/components/Misc/KeyboardExtender';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

export default function Tab() {
    const { session } = useAuth();

    if (Platform.OS === 'ios') {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
                keyboardVerticalOffset={110}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            {!session?.user.is_anonymous ? (
                                <View flex={1}>
                                    <Header />
                                    <StyledContainer>
                                        <CreateCard />
                                    </StyledContainer>
                                    <KeyboardExtender />
                                </View>
                            ) : (
                                <StyledContainer>
                                    <View gap={8}>
                                        <SizableText size={'$5'}>⚠️ Create an account to publish stories!</SizableText>
                                        <SignUp />
                                    </View>
                                </StyledContainer>
                            )}
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    } else {
        return (
            <>
                {!session?.user.is_anonymous ?
                    <View flex={1}>
                        <Header />
                        <StyledContainer>
                            <CreateCard />
                        </StyledContainer>
                        <KeyboardExtender />
                    </View>
                    :
                    <StyledContainer >
                        <View gap={8}>
                            <SizableText size={'$5'}>⚠️ Create an account to publish stories!</SizableText>
                            <SignUp />
                        </View>
                    </StyledContainer>}
            </>
        )
    }
}
