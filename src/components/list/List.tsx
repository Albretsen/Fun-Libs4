import { FlashList } from "@shopify/flash-list";
import { SizableText, View } from "tamagui";
import {
    useInfiniteQuery,
    useQueryClient,
} from '@tanstack/react-query';
import ListItemSeparator from "./ListItemSeparator";
import { RefreshControl } from "react-native";
import { useEffect, useState, ComponentType } from "react";
import { PAGE_SIZE } from "../../../settings";
import SkeletonCard from "../Card/SkeletonCard";
import { PostgrestResponse } from "@supabase/supabase-js";

interface ListProps<T> {
    queryKey: string;
    queryFn: (page: number) => Promise<PostgrestResponse<T>>;
    ListItem: ComponentType<{ item: T }>;
}

export default function List<T extends { id: string | number }>(props: ListProps<T>) {
    const { queryKey, queryFn, ListItem } = props;
    const queryClient = useQueryClient();
    const [items, setItems] = useState<T[]>([]);

    const {
        isFetching,
        isError,
        data,
        error,
        fetchNextPage,
        refetch,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<PostgrestResponse<T>>({
        queryKey: [queryKey],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => queryFn(pageParam as number),
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage || !lastPage.data || lastPage.data.length < PAGE_SIZE) {
                return undefined;
            }
            return pages.length;
        },
    });

    useEffect(() => {
        if (!data) return;
        const temp_items: T[] = data.pages.flatMap(page => page.data ?? []);
        setItems(temp_items);
    }, [data]);

    const refresh = async () => {
        queryClient.resetQueries({ queryKey: [queryKey], exact: true });
        // It seems explicitly stating the tab is necessary for refresh to work
        queryClient.resetQueries({ queryKey: ['community_libs'], exact: true });
        queryClient.resetQueries({ queryKey: ['profile_libs'], exact: true });
    }

    const onEndReached = () => {
        if (hasNextPage && items.length > 1) {
            fetchNextPage();
        }
    };

    if (isError) {
        return (
            <SizableText size={'$5'}>Error loading list {error.message}</SizableText>
        )
    }

    return (
        <View flex={1}>
            <FlashList
                data={isFetching && !isFetchingNextPage ? [] : items}
                renderItem={({ item }: { item: T }) => <ListItem item={item} />}
                keyExtractor={(item: T, i: number) => {
                    return item.id + " " + i;
                }}
                estimatedItemSize={80}
                ListEmptyComponent={isFetching ?
                    <View flex={1}>
                        {[...Array(5)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </View> :
                    <View flex={1}>
                        <SizableText size={'$5'}>No results</SizableText>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 16 }}
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
