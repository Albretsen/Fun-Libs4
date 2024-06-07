import { View, Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Link } from 'expo-router';
import List from '../../src/UI/list/List';
import ListItem from '../../src/UI/list/ListItem';
import { supabase } from '../../supabase';

export default function Tab() {
    return (
        <StyledContainer>
            <List queryKey={"libs"} ListItem={ListItem} queryFn={async () => { return await supabase.from('libs').select('*') }} />
            <Link href="auth/login">GO TO LOGIN PAGE</Link>
        </StyledContainer>
    );
}