import { usePackStore } from "../../hooks/usePackStore";
import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";
import useIAP from "../../hooks/useIAP";
import { Button, View, SizableText } from "tamagui";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function PackPicker() {
    const [price, setPrice] = useState<string | null>();

    const { pack, setPack, ownedPacks, packsData } = usePackStore();

    const queryClient = useQueryClient();

    const { purchase, getPrice, setOwnedPacksState } = useIAP();

    const changePack = (pack: string | null) => {
        setPack(pack);
    }

    const purchasePack = async () => {
        const result = await purchase(pack);
        if (!result) {
            return;
        }
        queryClient.removeQueries({ queryKey: ['pack_libs_' + pack] });
        queryClient.removeQueries({ queryKey: ['official_libs'] });
    }

    useEffect(() => {
        const getPriceAsync = async () => {
            const price = await getPrice(pack);
            setPrice(price);
        }

        getPriceAsync();
    }, [pack]);

    useEffect(() => {
        setOwnedPacksState(undefined);
    }, []);

    return (
        <View paddingBottom={16}>
            <ScrollableButtons ownedPacks={ownedPacks ? ownedPacks : []} buttons={
                [
                    { label: "🎉 Free", state: "active", onPress: () => { changePack(null) } },
                    { label: "❤️ Romantic", state: ownedPacks?.includes("romance" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("romance") } },
                    { label: "🚀 History", state: ownedPacks?.includes("historic" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("historic") } },
                    { label: "🐣 Easter", state: ownedPacks?.includes("easter" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("easter") } },
                    { label: "🎄 Christmas", state: ownedPacks?.includes("christmas" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("christmas") } },
                ]
            } />
            {pack && !(ownedPacks?.includes(pack + "_pack")) ?
                <View gap={8} paddingTop={8}>
                    <SizableText size={'$8'} fontWeight={900}>{packsData[pack].title}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>{packsData[pack].description}</SizableText>
                    <Button borderRadius={100} backgroundColor={'$main4'} width={''} onPress={purchasePack}>Unlock{price}</Button>
                </View> : null}
        </View>
    )
}