import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OfficialTab from '../play/official';
import CommunityTab from '../play/community';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator screenOptions={{
            swipeEnabled: false,
        }}>
            <Tab.Screen name="Official" component={OfficialTab} />
            <Tab.Screen name="Community" component={CommunityTab} />
        </Tab.Navigator>
    );
}