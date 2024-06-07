import { View, Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Link } from 'expo-router';
import List from '../../src/components/list/List';
import ListItem from '../../src/components/list/ListItem';
import { supabase } from '../../supabase';

export default function Tab() {
    return (
        <StyledContainer>
            <List queryKey={"libs"} ListItem={ListItem} queryFn={async () => { return await supabase.from('libs').select(`*, profiles(*)`) }} />
            <Link href="auth/login">GO TO LOGIN PAGE</Link>
        </StyledContainer>
    );
}