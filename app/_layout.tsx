import React from 'react';
import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import appConfig from '../tamagui.config';
import { useLoadAssets } from '../src/hooks/useLoadAssets';
import { Stack } from 'expo-router/stack';

export default function Layout() {
    const isLoadingComplete = useLoadAssets();

    if (!isLoadingComplete) return null;

    return (
        <TamaguiProvider config={appConfig}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </TamaguiProvider>
    );
}