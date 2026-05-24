import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OfficialTab from '../play/official';
import CommunityTab from '../play/community';
import { View, useTheme, Text } from 'tamagui';
import { Dimensions } from 'react-native';
import Header from '../../src/components/Header';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
    const theme = useTheme();

    return (
        <View style={{ top: 0 }} flex={1} backgroundColor={theme.background.val} >
            <Header />
            <Tab.Navigator screenOptions={{
                swipeEnabled: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    shadowColor: 'transparent',
                    width: '100%',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: theme.color.val,
                    height: 2
                },
                tabBarActiveTintColor: theme.color.val,
                tabBarPressColor: theme.color.val,
            }} initialLayout={{
                width: Dimensions.get('window').width
            }}>
                <Tab.Screen name="Official" component={OfficialTab} options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontFamily: 'InterBold', fontSize: 16, textTransform: 'none' }} numberOfLines={1}>
                            Fun Libs
                        </Text>
                    ),
                }} />
                <Tab.Screen name="Community" component={CommunityTab} options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontFamily: 'InterBold', fontSize: 16, textTransform: 'none' }} numberOfLines={1}>
                            Community
                        </Text>
                    ),
                }} />
            </Tab.Navigator>
        </View>
    );
}