import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../../supabase';
import { Button } from 'tamagui';
import { TextInput } from 'react-native';
import useAuth from '../../src/hooks/useAuth';

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn, signOut, signUp } = useAuth();

    async function signInWithEmail() {
        setLoading(true);
        await signIn(email, password);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        await signUp(email, password);
        setLoading(false);
    }

    async function handleSignOut() {
        setLoading(true);
        await signOut();
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
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button disabled={loading} onPress={() => signInWithEmail()}>Sign in</Button>
            </View>
            <View style={styles.verticallySpaced}>
                <Button disabled={loading} onPress={() => signUpWithEmail()}>Sign up</Button>
            </View>
            <View style={styles.verticallySpaced}>
                <Button disabled={loading} onPress={() => handleSignOut()}>Sign out</Button>
            </View>
            <View style={styles.verticallySpaced}>
                <Button disabled={loading} onPress={() => devSignIn()}>DEV SIGN IN</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})