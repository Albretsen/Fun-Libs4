import { StyledContainer } from '../../src/styles/styles';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import { PAGE_SIZE } from '../../settings';
import { LibWithProfile } from '../../src/interfaces/interfaces';
import { PostgrestResponse } from '@supabase/supabase-js';

export default function Tab() {
    return (
      <StyledContainer>
          <List
          queryKey={"community_libs"}
          ListItem={Card}
              queryFn={async (page: number): Promise<PostgrestResponse<LibWithProfile>> => {
                  return await supabase
                      .from('libs')
                      .select(`*, profiles(*)`)
                      .neq("author", process.env.EXPO_PUBLIC_FUN_LIBS_ACCOUNT_UUID)
                      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
                      .order('created_at', { ascending: false });
              }}
          />
      </StyledContainer>
    );
}
