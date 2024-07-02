import { Tabs, useSegments } from 'expo-router';
import { Play, BookText, Pen, User } from '@tamagui/lucide-icons';
import useKeyboardVisibility from '../../src/hooks/useKeyboardVisibility';

export default function TabLayout() {
    const segment = useSegments();

    const page = segment[segment.length - 1];

    const pagesToHideTabBar = ['create'];

    const isKeyboardVisible = useKeyboardVisibility();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '$main12',
            tabBarLabelStyle: {
                fontFamily: 'Inter', fontSize: 13, paddingBottom: 4
            },
            tabBarStyle: {
                height: 64,
                display: pagesToHideTabBar.includes(page) && isKeyboardVisible ? 'none' : 'flex'
            },
            tabBarIconStyle: {
                marginBottom: -4
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Play',
                    tabBarIcon: ({ color }) => <Play size={'$1.5'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="read"
                options={{
                    title: 'Read',
                    tabBarIcon: ({ color }) => <BookText size={'$1.5'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color }) => <Pen size={'$1.5'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <User size={'$1.5'} color={color} />,
                }}
            />
        </Tabs>
    );
}