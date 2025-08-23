import React, { useState, useEffect } from 'react';
import { Appearance, Platform } from 'react-native';
import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import config from '../tamagui.config';
import { useLoadAssets } from '../src/hooks/loading/useLoadAssets';
import { Stack } from 'expo-router/stack';
import { PortalProvider, Theme, Spinner, View } from 'tamagui';
import { useInitializeScripts } from '../src/hooks/loading/useInitializeScripts';
import LoginScreen from './auth/login';
import useAuth from '../src/hooks/useAuth';
import { toastConfig } from '../src/styles/toast';
import { BannerAd, BannerAdSize, RequestOptions } from 'react-native-google-mobile-ads';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { CreateProvider } from '../src/Contexts/CreateContext';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAds from '../src/hooks/useAds';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { AdContext } from '../src/Contexts/AdContext';

const queryClient = new QueryClient();

export default function App() {
    const assetsLoaded = useLoadAssets();
    const scriptsLoaded = useInitializeScripts();
    const { session } = useAuth();
    const { BannerAdID, initializeAds } = useAds();

    // Ensure an ad actually loads
    useEffect(() => {
        initializeAds();
    }, []);

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");
    const [requestOptions, setRequestOptions] = useState<RequestOptions>({});

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

    // Ask ATT permission once
    useEffect(() => {
        const askForTracking = async () => {
            if (Platform.OS === 'ios') {
                const status = await requestTrackingPermission();

                if (status === 'authorized') {
                    setRequestOptions({ requestNonPersonalizedAdsOnly: false });
                } else {
                    setRequestOptions({ requestNonPersonalizedAdsOnly: true });
                }
            } else {
                // Android: personalized ads by default
                setRequestOptions({});
            }
        };

        askForTracking();
    }, []);


    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider config={config}>
                <Theme name={currentTheme}>
                    <CreateProvider>
                        <AdContext.Provider value={{ requestOptions }}>
                            <PortalProvider>
                                <GestureHandlerRootView>
                                    {assetsLoaded && scriptsLoaded ? (
                                        <>
                                            {session && session.user ? (
                                                <SafeAreaView style={{ flex: 1 }}>
                                                    <Stack
                                                        screenOptions={{
                                                            headerShown: false,
                                                        }}
                                                    />
                                                    {BannerAdID && requestOptions && (
                                                        <BannerAd
                                                            unitId={BannerAdID}
                                                            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                                                            requestOptions={requestOptions}
                                                        />
                                                    )}
                                                </SafeAreaView>
                                            ) : (
                                                <LoginScreen />
                                            )}
                                        </>
                                    ) : (
                                        <View
                                            flex={1}
                                            alignItems="center"
                                            justifyContent="center"
                                            backgroundColor={'$background'}
                                        >
                                            <Spinner />
                                        </View>
                                    )}
                                    <Toast config={toastConfig} />
                                </GestureHandlerRootView>
                            </PortalProvider>
                        </AdContext.Provider>
                    </CreateProvider>
                </Theme>
            </TamaguiProvider>
        </QueryClientProvider>
    );
}
