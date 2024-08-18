import { StyledContainer } from '../../src/styles/styles';
import List from '../../src/components/list/List';
import Card from '../../src/components/Card/Card';
import { supabase } from '../../supabase';
import { PAGE_SIZE } from '../../settings';
import PackPicker from '../../src/components/Misc/PackPicker';
import { useEffect } from 'react';
import { usePackStore } from '../../src/hooks/usePackStore';
import { useQueryClient } from '@tanstack/react-query';

export default function Tab() {
    const { pack } = usePackStore();

    return (
        <StyledContainer>
            <PackPicker />
            {!pack ?
                <List queryKey={"official_libs"} ListItem={Card} queryFn={async (page: number) => {
                    return await supabase.from('libs').select(`*, profiles(*)`).eq("author", process.env.EXPO_PUBLIC_FUN_LIBS_ACCOUNT_UUID).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1).order('created_at', { ascending: false });
                }} />
                :
                <List queryKey={"pack_libs_" + pack} ListItem={Card} queryFn={async (page: number) => {
                    return await supabase.from('libs_packs').select(`*, profiles(*)`).eq("pack", pack).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1).order('created_at', { ascending: false });
                }} />}
        </StyledContainer>
    );
}