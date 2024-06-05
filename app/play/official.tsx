import { View, Text } from 'react-native';
import styles from '../../src/styles/styles';
import { Link } from 'expo-router';
import List from '../../src/UI/list/list';
import ListItem from '../../src/UI/list/ListItem';
import { supabase } from '../../supabase';

export default function Tab() {
    return (
        <View style={styles.container}>
            <Text>Tab Official</Text>
            <Link href="auth/login">test</Link>
            <List queryKey={"libs"} ListItem={ListItem} queryFn={async () => { return await supabase.from('libs').select('*') }} />
        </View>
    );
}