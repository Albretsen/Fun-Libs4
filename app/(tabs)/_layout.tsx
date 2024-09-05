import { Tabs, useSegments } from 'expo-router';
import { Play, BookText, Pen, User } from '@tamagui/lucide-icons';
import { useTheme, View } from 'tamagui';
import useKeyboardVisibility from '../../src/hooks/useKeyboardVisibility';
import { Platform, SafeAreaView } from 'react-native';

export default function TabLayout() {
    const theme = useTheme();

    const segment = useSegments();

    const page = segment[segment.length - 1];

    const pagesToHideTabBar = ['create'];

    const isKeyboardVisible = useKeyboardVisibility();

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS == "android" ? 10 : 0, backgroundColor: theme.main1.val }}>
            <Tabs screenOptions={{
                tabBarActiveTintColor: theme.main12.val,
                tabBarLabelStyle: {
                    fontFamily: 'Inter', fontSize: 13, paddingBottom: Platform.OS == "android" ? 4 : 0, color: theme.main12.val,
                },
                tabBarStyle: {
                    height: Platform.OS == "android" ? 64 : 100,
                    backgroundColor: theme.main2.val,
                    display: pagesToHideTabBar.includes(page) && isKeyboardVisible ? 'none' : 'flex'
                },
                tabBarIconStyle: {
                    marginBottom: Platform.OS == "android" ? -4 : 0
                },
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Play',
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                backgroundColor: focused ? theme.main4.val : 'transparent',
                                borderRadius: 8,
                                paddingVertical: 4,
                                paddingHorizontal: 14,
                            }}>
                                <Play size={22} color={theme.main12.val} />
                            </View>
                        ),
                    }}
                />
                {/* <Tabs.Screen
                name="read"

                options={{
                    title: 'Read',
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            backgroundColor: focused ? theme.main3.val : 'transparent',
                            borderRadius: 8,
                            paddingVertical: 4,
                            paddingHorizontal: 14,
                        }}>
                            <BookText size={22} color={theme.main12.val} />
                        </View>
                    ),
                }}
            /> */}
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                backgroundColor: focused ? theme.main4.val : 'transparent',
                                borderRadius: 8,
                                paddingVertical: 4,
                                paddingHorizontal: 14,
                            }}>
                                <Pen size={22} color={theme.main12.val} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                backgroundColor: focused ? theme.main4.val : 'transparent',
                                borderRadius: 8,
                                paddingVertical: 4,
                                paddingHorizontal: 14,
                            }}>
                                <User size={22} color={theme.main12.val} />
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}