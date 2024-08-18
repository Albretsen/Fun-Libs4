import { Image, Input, View, XStack, Text, SizableText, Button } from "tamagui";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { Bell, ArrowLeft, Menu, X, Pen } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Drawer, { DrawerRef } from "./Drawer/Drawer";
import { useRef } from "react";

export default function Header() {

    const { session } = useAuth();

    const navigationDrawerRef = useRef<DrawerRef>(null);

    return (
        <Stack.Screen
            options={{
                headerShown: true,
                header: (props) =>
                    <>
                        <SafeAreaView>
                            {props.route.name === "profile" ?
                                <View style={{
                                    height: 0,
                                }}>
                                    <XStack margin={16} height={32} justifyContent="space-between" alignItems="center">
                                        <Button
                                            borderWidth={1}
                                            borderColor={'$main6'}
                                            aspectRatio={1}
                                            backgroundColor={'$main4'}
                                            borderRadius={50}
                                        >
                                            <X />
                                        </Button>
                                        <Button
                                            borderWidth={1}
                                            borderColor={'$main6'}
                                            backgroundColor={'$main4'}
                                            height={40}
                                            borderRadius={50}
                                            gap={0}
                                        >
                                            <Pen />
                                            <SizableText>Edit</SizableText>
                                        </Button>
                                    </XStack>
                                    {/* <SizableText>{JSON.stringify(props)}</SizableText> */}
                                </View>
                                :
                                <>{!props.back ?
                                    <View backgroundColor={'$background'}>
                                        <XStack margin={16} height={32} alignItems="center" >
                                            <TouchableOpacity onPress={() => navigationDrawerRef.current?.openDrawer()}>
                                                <Menu />
                                            </TouchableOpacity>
                                            {/* <Input placeholder="Search" height={'100%'} flex={1} marginHorizontal={16} borderRadius={999} /> */}
                                            <SizableText size={'$6'} flex={1} marginHorizontal={16} textAlign="center" fontWeight={'500'}>{props.options.title}</SizableText>
                                            <Image height={'100%'} width={32} backgroundColor={'$main6'} objectFit="contain" source={{
                                                uri: session?.user?.avatar_url ? session.user.avatar_url : 'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/no-avatar.png',
                                            }} borderRadius={1000} />
                                        </XStack>
                                    </View>
                                    :
                                    <View backgroundColor={'$background'}>
                                        <XStack margin={16} height={16} alignItems="center">
                                            <TouchableOpacity onPress={() => router.back()} hitSlop={16} style={{ height: '100%' }}>
                                                <ArrowLeft />
                                            </TouchableOpacity>
                                        </XStack>
                                    </View>
                                }</>}
                        </SafeAreaView>
                        <Drawer side="left" ref={navigationDrawerRef}>
                            {/* Drawer content here */}
                        </Drawer>
                    </>
            }}
        />
    )
}