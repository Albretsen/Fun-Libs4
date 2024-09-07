import { Image, Input, View, XStack, Text, SizableText, Button } from "tamagui";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { Bell, ArrowLeft, Menu, X, Pen } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Drawer, { DrawerRef } from "./Drawer/Drawer";
import { useRef } from "react";
import { Linking, Platform } from "react-native";
import { useTheme } from "tamagui";
import { useEffect, useState } from "react";

export default function Header() {

    const theme = useTheme();

    const { session, signOut } = useAuth();

    const navigationDrawerRef = useRef<DrawerRef>(null);

    return (
        <Stack.Screen
            options={{
                headerShown: true,
                header: (props) =>
                    <>
                        {props.route.name === "profile" || props.route.name === "public-profile-index" ?
                            <View style={{
                                height: 0,
                            }}>
                                <XStack margin={16} marginTop={Platform.OS == "android" ? 30 : 16} height={32} justifyContent="space-between" alignItems="center">
                                    <Button
                                        borderWidth={1}
                                        borderColor={'$main6'}
                                        aspectRatio={1}
                                        backgroundColor={'$main4'}
                                        borderRadius={50}
                                        onPress={() => router.back()}
                                    >
                                        <X />
                                    </Button>
                                    {/* <Button
                                        borderWidth={1}
                                        borderColor={'$main6'}
                                        backgroundColor={'$main4'}
                                        height={40}
                                        borderRadius={50}
                                        gap={0}
                                    >
                                        <Pen />
                                        <SizableText>Edit</SizableText>
                                    </Button> */}
                                </XStack>
                                {/* <SizableText>{JSON.stringify(props)}</SizableText> */}
                            </View>
                            :
                            <>{!props.back ?
                                <View backgroundColor={theme.background.val}>
                                    <XStack margin={16} marginTop={Platform.OS == "android" ? 30 : 16} height={32} alignItems="center" >
                                        <TouchableOpacity onPress={() => navigationDrawerRef.current?.openDrawer()}>
                                            <Menu />
                                        </TouchableOpacity>
                                        {/* <Input placeholder="Search" height={'100%'} flex={1} marginHorizontal={16} borderRadius={999} /> */}
                                        <SizableText size={'$6'} flex={1} marginHorizontal={16} textAlign="center" fontWeight={'500'}>{props.options.title}</SizableText>
                                        <TouchableOpacity onPress={() => router.navigate("/profile")} hitSlop={16}>
                                            <Image height={'100%'} width={32} backgroundColor={'$main6'} objectFit="contain" source={{
                                                uri: session?.user.user_metadata.avatar_url
                                                    ? session.user.user_metadata.avatar_url
                                                    : 'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/no-avatar.png',
                                            }} borderRadius={1000} />
                                        </TouchableOpacity>
                                    </XStack>
                                </View>
                                :
                                <View backgroundColor={'$background'}>
                                    <XStack margin={16} marginTop={Platform.OS == "android" ? 26 : 16} height={16} alignItems="center">
                                        <TouchableOpacity onPress={() => router.back()} hitSlop={16} style={{ height: '100%' }}>
                                            <ArrowLeft />
                                        </TouchableOpacity>
                                    </XStack>
                                </View>
                            }</>}
                        <Drawer side="left" ref={navigationDrawerRef}>
                            <View marginVertical={16} >
                                <Button fontWeight={900} fontSize={'$6'} alignSelf="flex-start" onPress={() => {
                                }}>Fun Libs</Button>
                                <Button alignSelf="flex-start" onPress={() => {
                                    navigationDrawerRef.current?.closeDrawer();
                                    router.navigate("/")
                                }}>Home</Button>
                                <Button alignSelf="flex-start" onPress={() => {
                                    navigationDrawerRef.current?.closeDrawer();
                                    router.navigate("/create")
                                }}>Create</Button>
                                <Button alignSelf="flex-start" onPress={() => {
                                    navigationDrawerRef.current?.closeDrawer();
                                    router.navigate("/profile")
                                }}>Profile</Button>
                                <Button alignSelf="flex-start" onPress={() => {
                                    navigationDrawerRef.current?.closeDrawer();
                                    Linking.openURL('mailto:contact@funlibs.app')
                                }}>Help</Button>
                                <Button fontWeight={900} alignSelf="flex-start" color={'$red11'} backgroundColor={'$red'} onPress={() => {
                                    navigationDrawerRef.current?.closeDrawer();
                                    signOut()
                                }}>Sign out</Button>
                            </View>
                        </Drawer>
                    </>
            }}
        />
    )
}