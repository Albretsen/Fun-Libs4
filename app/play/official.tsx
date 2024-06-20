import { View, Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Link } from 'expo-router';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import { PAGE_SIZE } from '../../settings';

export default function Tab() {
    return (
        <StyledContainer>
            <List queryKey={"libs"} ListItem={Card} queryFn={async (page: number) => {
                return await supabase.from('libs').select(`*, profiles(*)`).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
            }} />
        </StyledContainer>
    );
}