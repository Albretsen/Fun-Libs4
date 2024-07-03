import { Tabs } from 'expo-router';
import { Play, BookText, Pen, User } from '@tamagui/lucide-icons';
import { useTheme, View } from 'tamagui';

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: theme.main12.val,
            tabBarLabelStyle: {
                fontFamily: 'Inter', fontSize: 13, paddingBottom: 4, color: theme.main12.val,
            },
            tabBarStyle: {
                height: 64,
            },
            tabBarIconStyle: {
                marginBottom: -4
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Play',
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            backgroundColor: focused ? theme.main3.val : 'transparent',
                            borderRadius: 8,
                            paddingVertical: 4,
                            paddingHorizontal: 14,
                        }}>
                            <Play size={22} color={theme.main12.val} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
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
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            backgroundColor: focused ? theme.main3.val : 'transparent',
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
                            backgroundColor: focused ? theme.main3.val : 'transparent',
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
    );
}