import { FlashList } from "@shopify/flash-list";
import { Spinner, SizableText } from "tamagui";
import {
    useQuery,
    useQueryClient
} from '@tanstack/react-query';
import ListItemSeparator from "./ListItemSeparator";
import { RefreshControl } from "react-native";

export default function List(props: any) {
    const { queryKey, queryFn, ListItem } = props;

    const queryClient = useQueryClient()

    const { isFetching, isError, data, error } = useQuery<any>({ queryKey: [queryKey], queryFn: queryFn })

    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
    }

    const onEndReached = () => { }

    if (isFetching) {
        return (
            <Spinner size="small" color="$color" />
        );
    }

    if (isError) {
        return (
            <SizableText size={'$5'}>Error loading list {error.message}</SizableText>
        )
    }

    return (
        <FlashList
            data={data.data}
            renderItem={({ item }: any) => <ListItem item={item} variant={'listItem'}>List item placeholder</ListItem>}
            estimatedItemSize={80}
            ListEmptyComponent={<SizableText size={'$5'}>No results</SizableText>}
            onRefresh={refresh}
            onEndReached={onEndReached}
            refreshing={isFetching}
            ItemSeparatorComponent={ListItemSeparator}
            refreshControl={<RefreshControl onRefresh={refresh} refreshing={isFetching} colors={['lightblue']} />}
        />
    );
}