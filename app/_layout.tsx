import React from 'react';
import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import config from '../tamagui.config';
import { useLoadAssets } from '../src/hooks/loading/useLoadAssets';
import { Stack } from 'expo-router/stack';
import { PortalProvider, Theme } from 'tamagui';
import { useInitializeScripts } from '../src/hooks/loading/useInitializeScripts';
import LoginScreen from './auth/login';
import useAuth from '../src/hooks/useAuth';
import { toastConfig } from '../src/styles/toast';
import { BannerAd } from 'react-native-google-mobile-ads';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { CreateProvider } from '../src/Contexts/CreateContext';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAds from '../src/hooks/useAds';

const queryClient = new QueryClient();

export default function App() {
    const assetsLoaded = useLoadAssets();
    const scriptsLoaded = useInitializeScripts();

    const { session } = useAuth();

    const { BannerAdID } = useAds();

    if (!assetsLoaded || !scriptsLoaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider config={config}>
                <Theme name="light">
                    <CreateProvider>
                        <PortalProvider>
                            {session && session.user ?
                                <SafeAreaView style={{ flex: 1 }}>
                                    <Stack
                                        screenOptions={{
                                            headerShown: false,
                                        }}
                                    />
                                    <BannerAd unitId={BannerAdID} size='ANCHORED_ADAPTIVE_BANNER' />
                                </SafeAreaView>
                                :
                                <LoginScreen />}
                            <Toast config={toastConfig} />
                        </PortalProvider>
                    </CreateProvider>
                </Theme>
            </TamaguiProvider>
        </QueryClientProvider >
    );
}