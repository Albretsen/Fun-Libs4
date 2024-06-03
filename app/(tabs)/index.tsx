import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CommunityTab from '../../src/screens/community';
import OfficialTab from '../../src/screens/official';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Official" component={OfficialTab} />
            <Tab.Screen name="Community" component={CommunityTab} />
        </Tab.Navigator>
    );
}