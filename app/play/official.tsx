import { View, Text } from 'react-native';
import styles from '../../src/styles/styles';
import { Link } from 'expo-router';

export default function Tab() {
    return (
        <View style={styles.container}>
            <Text>Tab Official</Text>
            <Link href="auth/login">test</Link>
        </View>
    );
}