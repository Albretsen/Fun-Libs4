import { usePackStore } from "../../hooks/usePackStore";
import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";
import useIAP from "../../hooks/useIAP";
import { Button, View, SizableText } from "tamagui";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PackPicker() {
    const [price, setPrice] = useState<string | null>();
    const { pack, setPack, ownedPacks, packsData } = usePackStore();
    const queryClient = useQueryClient();
    const { purchase, getPrice, setOwnedPacksState } = useIAP();
    const { t } = useTranslation();

    const changePack = (pack: string | null) => {
        setPack(pack);
    }

    const purchasePack = async () => {
        const result = await purchase(pack);
        if (!result) {
            return;
        }
        queryClient.resetQueries({ queryKey: ['pack_libs_' + pack], exact: true });
        queryClient.resetQueries({ queryKey: ['official_libs'], exact: true });
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
                    { label: t('Packs.free.shortTitle'), state: "active", onPress: () => { changePack(null) } },
                    { label: t('Packs.romance.shortTitle'), state: ownedPacks?.includes("romance" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("romance") } },
                    { label: t('Packs.historic.shortTitle'), state: ownedPacks?.includes("historic" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("historic") } },
                    { label: t('Packs.easter.shortTitle'), state: ownedPacks?.includes("easter" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("easter") } },
                    { label: t('Packs.christmas.shortTitle'), state: ownedPacks?.includes("christmas" + "_pack") ? "inactive" : "locked", onPress: () => { changePack("christmas") } },
                ]
            } />
            {pack && !(ownedPacks?.includes(pack + "_pack")) ?
                <View gap={8} paddingTop={8}>
                    <SizableText size={'$8'} fontWeight={900}>{t(`Packs.${pack}.title`)}</SizableText>
                    <SizableText size={'$4'} fontWeight={400}>{t(`Packs.${pack}.description`)}</SizableText>
                    <Button borderRadius={100} backgroundColor={'$main4'} width={''} onPress={purchasePack}>{t('Packs.Unlock') + " " + price}</Button>
                </View> : null}
        </View>
    )
}