import { FlashList } from "@shopify/flash-list";
import { SizableText, View } from "tamagui";
import {
    useInfiniteQuery,
    useQueryClient,
} from '@tanstack/react-query';
import ListItemSeparator from "./ListItemSeparator";
import { RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../../settings";
import SkeletonCard from "../Card/SkeletonCard";

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
        refetch,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<any>({
        queryKey: [queryKey],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage || !lastPage.data || lastPage.data.length < PAGE_SIZE) {
                return undefined;
            }
            return pages.length;
        },
    });

    useEffect(() => {
        if (!data) return;

        const temp_items: any[] = data.pages.flatMap(page => page.data ?? []);
        setItems(temp_items);
    }, [data]);


    const refresh = async () => {
        queryClient.resetQueries({ queryKey, exact: true });
    }

    const onEndReached = () => {
        if (hasNextPage && items.length > 1) {
            fetchNextPage();
        }
    };

    // if (isFetching && !isFetchingNextPage) {
    //     return (
    //         <View flex={1}>
    //             {[...Array(5)].map((_, index) => (
    //                 <SkeletonCard key={index} />
    //             ))}
    //         </View>
    //     );
    // }

    if (isError) {
        return (
            <SizableText size={'$5'}>Error loading list {error.message}</SizableText>
        )
    }

    return (
        <View flex={1}>
            <FlashList
                data={isFetching && !isFetchingNextPage ? [] : items}
                renderItem={({ item }: any) => <ListItem item={item} variant={'listItem'} />}
                keyExtractor={(item: any, i: number) => {
                    return item.id + " " + i
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