import { FlashList } from "@shopify/flash-list";
import { Spinner, SizableText, View } from "tamagui";
import {
    useInfiniteQuery,
    useQueryClient,
} from '@tanstack/react-query';
import ListItemSeparator from "./ListItemSeparator";
import { RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../../settings";

export default function List(props: any) {
    const { queryKey, queryFn, ListItem } = props;

    const queryClient = useQueryClient();

    const [items, setItems] = useState([]);

    const {
        isFetching,
        isError,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<any>({
        queryKey: [queryKey],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.data.length < PAGE_SIZE) {
                return undefined;
            }
            return pages.length;
        },
    });

    useEffect(() => {
        let temp_items: any = [];
        if (!data) return;
        for (let i = 0; i < data.pages.length; i++) {
            for (let j = 0; j < data.pages[i].data.length; j++) {
                temp_items.push(data.pages[i].data[j]);
            }
        }
        setItems(temp_items);
    }, [data]);

    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
    }

    const onEndReached = () => {
        if (hasNextPage && items.length > 1) {
            fetchNextPage();
        }
    };

    if (isFetching && !isFetchingNextPage) {
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
        <View flex={1}>
            <FlashList
                data={items}
                renderItem={({ item }: any) => <ListItem item={item} variant={'listItem'} />}
                keyExtractor={(item: any) => item.id}
                estimatedItemSize={80}
                ListEmptyComponent={<SizableText size={'$5'}>No results</SizableText>}
                onRefresh={refresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                refreshing={isFetching}
                ItemSeparatorComponent={ListItemSeparator}
                refreshControl={<RefreshControl onRefresh={refresh} refreshing={isFetching} colors={['lightblue']} />}
            />
        </View>
    );
}