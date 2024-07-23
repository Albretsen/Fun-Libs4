import React from 'react';
import '@tamagui/core/reset.css';
import { TamaguiProvider, View } from '@tamagui/core';
import config from '../tamagui.config';
import { useLoadAssets } from '../src/hooks/loading/useLoadAssets';
import { Stack } from 'expo-router/stack';
import { SizableText, Theme } from 'tamagui';
import { useInitializeScripts } from '../src/hooks/loading/useInitializeScripts';
import LoginScreen from './auth/login';
import useAuth from '../src/hooks/useAuth';
import { toastConfig } from '../src/styles/toast';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { CreateProvider } from '../src/Contexts/CreateContext';
import Toast from 'react-native-toast-message';
import Header from '../src/components/Header';

const queryClient = new QueryClient();

export default function App() {
    const assetsLoaded = useLoadAssets();
    const scriptsLoaded = useInitializeScripts();

    const { session } = useAuth();

    if (!assetsLoaded || !scriptsLoaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider config={config}>
                <Theme name="light">
                    <CreateProvider>
                        {session && session.user ?
                            <>
                                <Header />
                                <Stack
                                    screenOptions={{
                                        headerShown: false,
                                    }}
                                />
                            </>
                            :
                            <LoginScreen />}
                        <Toast config={toastConfig} />
                    </CreateProvider>
                </Theme>
            </TamaguiProvider>
        </QueryClientProvider >
    );
}