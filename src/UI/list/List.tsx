import { FlashList } from "@shopify/flash-list";
import { Spinner, SizableText } from "tamagui";
import {
    useQuery,
    useQueryClient
} from '@tanstack/react-query';

export default function List(props: any) {
    const { queryKey, queryFn, ListItem } = props;

    const queryClient = useQueryClient()

    const { status, data, error } = useQuery<any>({ queryKey: [queryKey], queryFn: queryFn })

    if (status === 'pending') {
        return (
            <Spinner size="small" color="$color" />
        );
    }

    if (status === 'error') {
        return (
            <SizableText size={'$5'}>Error loading list {error.message}</SizableText>
        )
    }

    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
    }

    const onEndReached = () => { }

    return (
        <FlashList
            data={data.data}
            renderItem={({ item }: any) => <ListItem item={item}>List item placeholder</ListItem>}
            estimatedItemSize={80}
            ListEmptyComponent={<SizableText size={'$5'}>No results</SizableText>}
            onRefresh={refresh}
            onEndReached={onEndReached}
            refreshing={status === 'pending'}
        />
    );
}