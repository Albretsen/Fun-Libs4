import { StyledContainer } from '../../src/styles/styles';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import { PAGE_SIZE } from '../../settings';
import ScrollableButtons from '../../src/components/ScrollableButtons/ScrollableButtons';

export default function Tab() {
    return (
        <StyledContainer>
            <ScrollableButtons />
            <List queryKey={"libs"} ListItem={Card} queryFn={async () => { return await supabase.from('libs').select(`*, profiles(*)`) }} />
            {/* <Link href="auth/login">GO TO LOGIN PAGE</Link> */}
        </StyledContainer>
    );
}