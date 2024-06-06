import { View, Text } from 'react-native';
import styles from '../../src/styles/styles';
import { Link } from 'expo-router';
import List from '../../src/UI/list/List';
import ListItem from '../../src/UI/list/ListItem';
import { supabase } from '../../supabase';

export default function Tab() {
    return (
        <View style={styles.container}>
            <List queryKey={"libs"} ListItem={ListItem} queryFn={async () => { return await supabase.from('libs').select('*') }} />
            <Link href="auth/login">GO TO LOGIN PAGE</Link>
        </View>
    );
}