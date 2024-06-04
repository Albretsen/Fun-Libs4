import React from 'react';
import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import config from '../tamagui.config';
import { useLoadAssets } from '../src/hooks/loading/useLoadAssets';
import { Stack } from 'expo-router/stack';
import { Theme } from 'tamagui';
import { useInitializeScripts } from '../src/hooks/loading/useInitializeScripts';
import LoginScreen from './auth/login';
import useAuth from '../src/hooks/useAuth';

export default function App() {
    const assetsLoaded = useLoadAssets();
    const scriptsLoaded = useInitializeScripts();

    const { session } = useAuth();

    if (!assetsLoaded || !scriptsLoaded) return null;

    return (
        <TamaguiProvider config={config}>
            <Theme name="light">
                {session && session.user ? <Stack
                    screenOptions={{
                        headerShown: false
                    }}
                /> : <LoginScreen />}
            </Theme>
        </TamaguiProvider>
    );
}

//<Stack>
//<Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
//</Stack>