import { View, Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Link } from 'expo-router';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import ScrollableButtons from '../../src/components/ScrollableButtons/ScrollableButtons';

export default function Tab() {
    return (
        <StyledContainer>
            <ScrollableButtons />
            <List queryKey={"libs"} ListItem={Card} queryFn={async () => { return await supabase.from('libs').select(`*, profiles(*)`) }} />
            <Link href="auth/login">GO TO LOGIN PAGE</Link>
        </StyledContainer>
    );
}