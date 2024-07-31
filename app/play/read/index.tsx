import { StyledContainer } from '../../../src/styles/styles';
import { useQuery } from '@tanstack/react-query';
import Card from '../../../src/components/Card/Card';
import { SizableText } from 'tamagui';
import { useLibStore } from '../../../src/hooks/useLibStore';
import Header from '../../../src/components/Header';

export default function Tab() {
    const { getLib } = useLibStore();

    const { isFetching, isError, data, error } = useQuery<any>({ queryKey: ["lib"], queryFn: async () => { return getLib() } });

    if (isFetching) {
        return <StyledContainer />;
    }

    if (isError) {
        return (
            <SizableText size={'$5'}>Error {error.message}</SizableText>
        )
    }

    return (
        <StyledContainer >
            <Header />
            <Card item={data} variant='read' />
        </StyledContainer>
    );
}