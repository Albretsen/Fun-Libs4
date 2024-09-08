import React, { useState } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../../supabase';
import { Button, SizableText, View, Input, Spinner, ScrollView } from 'tamagui';
import useAuth from '../../src/hooks/useAuth';
import { StyledContainer } from '../../src/styles/styles';
import { validateEmail } from '../../src/utils/validation';
import Toast from 'react-native-toast-message';
import SignUp from '../../src/components/Auth/SignUp';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<'signin' | 'signup' | undefined>(undefined);
    const { signIn, signInAnonymously } = useAuth();

    const accountAlreadyExists = async () => {
        const result = await supabase.from('profiles').select().eq('email', email);

        if (result.data) return result.data.length > 0;
        return false;
    }

    const continue_ = async () => {
        if (!validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email is not valid'
            });
            return;
        }
        setLoading(true);
        if (await accountAlreadyExists()) setState('signin');
        else setState('signup');
        setLoading(false);
    }

    async function signInWithEmail() {
        setLoading(true);
        await signIn(email, password);
        setLoading(false);
    }

    async function signInAnonymously_() {
        setLoading(true);
        await signInAnonymously();
        setLoading(false);
    }

    async function devSignIn() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: 'test@email.com',
            password: 'Test123',
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <StyledContainer>
            <View alignItems='center' paddingTop={80} marginBottom={20}>
                <SizableText size={'$10'} fontWeight={900}>Fun Libs</SizableText>
            </View>
            <ScrollView flex={1}>
                <View flex={1} alignItems='center' justifyContent='center' marginHorizontal={16} gap={16}>
                    <SizableText size={'$8'} fontWeight={500}>Log in or sign up</SizableText>
                    <View width={'100%'} gap={8}>
                        <Input onChangeText={(text) => setEmail(text)} value={email} keyboardType={'email-address'} placeholder={`Email`} borderColor={'$main12'} />
                        {state === 'signin' ?
                            <>
                                <Input onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder={`Password`} borderColor={'$main12'} />
                                <Button iconAfter={loading ? <Spinner /> : null} backgroundColor={'$main12'} color={'$main2'} width={'100%'} onPress={() => signInWithEmail()} >Sign in</Button>
                            </>
                            : null}
                        {state === 'signup' ?
                            <SignUp email={email} />
                            : null}
                        {state === undefined ? <Button iconAfter={loading ? <Spinner /> : null} backgroundColor={'$main12'} color={'$main2'} width={'100%'} onPress={() => continue_()} >{'Continue'}</Button> : null}
                    </View>
                    <SizableText size={'$4'}>or</SizableText>
                    <Button backgroundColor={'transparent'} borderColor={'$main12'} color={'$main12'} width={'100%'} onPress={() => signInAnonymously_()}>Continue as Guest</Button>
                    {process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == "true" ? <Button backgroundColor={'transparent'} borderColor={'$main12'} color={'$main12'} width={'100%'} onPress={() => devSignIn()}>Auto sign in (Development mode only)</Button> : null}
                </View>
            </ScrollView>
            <View alignItems='center' padding={16}>
                <SizableText size={'$5'} textDecorationLine='underline' onPress={() => signInAnonymously_()}>Skip</SizableText>
            </View>
        </StyledContainer>
    )
}