import { Image, Input, View, XStack, Text, SizableText, Button } from "tamagui";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { Bell, ArrowLeft, Menu, X, Pen, Play, User, BadgeHelp, LogOut, UserX } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Drawer, { DrawerRef } from "./Drawer/Drawer";
import { useRef } from "react";
import { Linking, Platform } from "react-native";
import { useTheme } from "tamagui";
import { useEffect, useState } from "react";
import DrawerLink from "./Drawer/DrawerLink";
import DiscordLink from "./Drawer/DiscordLink";

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
                                            <Image height={'100%'} width={32} backgroundColor={'$main6'} source={{
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
                        <Drawer backgroundColor={theme.background.val} side="left" ref={navigationDrawerRef}>
                            <View paddingHorizontal={20} marginVertical={20} gap={16}>
                                <SizableText fontWeight={900} fontSize={'$6'}>Fun Libs</SizableText>
                                <DrawerLink
                                    label="Home"
                                    icon={<Play scale={0.75} />}
                                    onPress={() => {
                                        navigationDrawerRef.current?.closeDrawer();
                                        router.navigate("/")
                                    }}
                                />
                                <DrawerLink
                                    label="Create"
                                    icon={<Pen scale={0.75} />}
                                    onPress={() => {
                                        navigationDrawerRef.current?.closeDrawer();
                                        router.navigate("/create")
                                    }}
                                />
                                <DrawerLink
                                    label="Profile"
                                    icon={<User scale={0.75} />}
                                    onPress={() => {
                                        navigationDrawerRef.current?.closeDrawer();
                                        router.navigate("/profile")
                                    }}
                                />
                                <DrawerLink
                                    label="Help and feedback"
                                    icon={<BadgeHelp scale={0.75} />}
                                    onPress={() => {
                                        navigationDrawerRef.current?.closeDrawer();
                                        Linking.openURL('mailto:contact@funlibs.app')
                                    }}
                                />
                                <DiscordLink />
                                <View marginTop={20} gap={16}>
                                    <DrawerLink
                                        label="Sign out"
                                        labelColor={theme.red11.val}
                                        icon={<LogOut scale={0.75} />}
                                        onPress={() => {
                                            navigationDrawerRef.current?.closeDrawer();
                                            signOut();
                                        }}
                                    />
                                    {/* TODO: This should maybe just be shown if actually logged in */}
                                    <DrawerLink
                                        label="Delete account"
                                        labelColor={theme.red11.val}
                                        icon={<UserX scale={0.75} />}
                                        onPress={() => {
                                            navigationDrawerRef.current?.closeDrawer();
                                            router.navigate("/delete-account")
                                        }}
                                    />
                                </View>
                            </View>
                        </Drawer>
                    </>
            }}
        />
    )
}