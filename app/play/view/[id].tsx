import { StyledContainer } from '../../../src/styles/styles';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../supabase';
import Card from '../../../src/components/Card/Card';
import { Spinner, SizableText } from 'tamagui';

export default function Tab() {
    const { id } = useLocalSearchParams();

    const { isFetching, isError, data, error } = useQuery<any>({ queryKey: ["lib", id], queryFn: async () => { return await supabase.from('libs').select(`*, profiles(*)`).eq('id', id).single() } })

    if (isFetching) {
        return (
            <Spinner size="small" color="$color" />
        );
    }

    if (isError) {
        return (
            <SizableText size={'$5'}>Error {error.message}</SizableText>
        )
    }

    return (
        <StyledContainer >
            <Card item={data.data} variant='play' />
        </StyledContainer>
    );
}