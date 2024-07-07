import { StyledContainer } from '../../src/styles/styles';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import { PAGE_SIZE } from '../../settings';

export default function Tab() {
    return (
        <StyledContainer>
            <List queryKey={"official_libs"} ListItem={Card} queryFn={async (page: number) => {
                return await supabase.from('libs').select(`*, profiles(*)`).eq("author", process.env.EXPO_PUBLIC_FUN_LIBS_ACCOUNT_UUID).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
            }} />
        </StyledContainer>
    );
}