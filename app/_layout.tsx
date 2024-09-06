import React from 'react';
import { Appearance } from 'react-native';
import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import config from '../tamagui.config';
import { useLoadAssets } from '../src/hooks/loading/useLoadAssets';
import { Stack } from 'expo-router/stack';
import { Theme } from 'tamagui';
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
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

export default function App() {
    const assetsLoaded = useLoadAssets();
    const scriptsLoaded = useInitializeScripts();

    const { session } = useAuth();

    const [currentTheme, setCurrentTheme] = useState(Appearance.getColorScheme() || "light");

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        setCurrentTheme(colorScheme || "light");

        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setCurrentTheme(colorScheme || "light");
        });

        return () => {
            listener.remove();
        };
    }, []);

    if (!assetsLoaded || !scriptsLoaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider config={config}>
                <Theme name={currentTheme as "light" | "dark"}>
                    <CreateProvider>
                        {session && session.user ?
                            <Stack
                                screenOptions={{
                                    headerShown: false,
                                }}
                            />
                            :
                            <LoginScreen />}
                        <Toast config={toastConfig} />
                    </CreateProvider>
                </Theme>
            </TamaguiProvider>
        </QueryClientProvider >
    );
}