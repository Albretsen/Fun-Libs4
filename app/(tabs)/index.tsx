import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OfficialTab from '../play/official';
import CommunityTab from '../play/community';
import { View, useTheme } from 'tamagui';
import { Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
    const theme = useTheme();

    return (
        <View flex={1} backgroundColor={'$background'}>
            <Tab.Navigator screenOptions={{
                swipeEnabled: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    shadowColor: 'transparent',
                    width: '70%',
                    marginHorizontal: 16
                },
                tabBarLabelStyle: {
                    backgroundColor: 'transparent',
                    fontFamily: 'InterBold',
                    fontSize: 16,
                    textTransform: 'none'
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
                <Tab.Screen name="Official" component={OfficialTab} />
                <Tab.Screen name="Community" component={CommunityTab} />
            </Tab.Navigator>
        </View>
    );
}