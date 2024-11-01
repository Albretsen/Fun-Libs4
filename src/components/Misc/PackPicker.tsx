import { usePackStore } from "../../hooks/usePackStore";
import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";
import useIAP from "../../hooks/useIAP";
import { Button, View, SizableText } from "tamagui";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PackPickerProps {
    section: "buttons" | "buy";
}

type PackName = "romance" | "historic" | "easter" | "christmas";

// Helper to get the last occurrence of a given date
function getLastOccurrence(month: number, day: number): Date {
    const today = new Date();
    const year = today.getFullYear();
    let date = new Date(year, month, day);
    if (date > today) {
        date = new Date(year - 1, month, day);
    }
    return date;
}

// Helper to get the next occurrence of a given date
function getNextOccurrence(month: number, day: number): Date {
    const today = new Date();
    const year = today.getFullYear();
    let date = new Date(year, month, day);
    if (date < today) {
        date = new Date(year + 1, month, day);
    }
    return date;
}

const seasonalPackDates: Record<PackName, Date> = {
    romance: getNextOccurrence(1, 14), // Valentine's Day
    historic: getNextOccurrence(6, 4), // July 4th
    easter: getNextOccurrence(3, 17), // Approximate Easter
    christmas: getNextOccurrence(11, 25), // Christmas
};

// Function to get the minimum days between the last and next occurrences
function getClosestDaysDifference(month: number, day: number): number {
    const today = new Date();
    const lastOccurrence = getLastOccurrence(month, day);
    const nextOccurrence = getNextOccurrence(month, day);

    const daysSinceLast = Math.floor((+today - +lastOccurrence) / (1000 * 60 * 60 * 24));
    const daysUntilNext = Math.floor((+nextOccurrence - +today) / (1000 * 60 * 60 * 24));

    return Math.min(daysSinceLast, daysUntilNext);
}

interface ButtonProps {
    label: string;
    state: 'active' | 'inactive' | 'locked';
    onPress: () => void;
    dateDiff?: number;
}

export default function PackPicker({ section }: PackPickerProps) {
    const [price, setPrice] = useState<string | null>(null);
    const { pack, setPack, ownedPacks, packsData } = usePackStore();
    const queryClient = useQueryClient();
    const { purchase, getPrice, setOwnedPacksState } = useIAP();

    const changePack = (pack: string | null) => {
        setPack(pack);
    };

    const purchasePack = async () => {
        const result = await purchase(pack);
        if (!result) {
            return;
        }
        queryClient.resetQueries({ queryKey: ["pack_libs_" + pack], exact: true });
        queryClient.resetQueries({ queryKey: ["official_libs"], exact: true });
    };

    useEffect(() => {
        const getPriceAsync = async () => {
            if (pack) {
                const price = await getPrice(pack);
                setPrice(price);
            }
        };

        getPriceAsync();
    }, [pack]);

    useEffect(() => {
        setOwnedPacksState(undefined);
    }, []);

    const sortedSeasonalPacks: ButtonProps[] = (Object.keys(seasonalPackDates) as PackName[])
        .map((key) => {
            const [month, day] = [
                seasonalPackDates[key].getMonth(),
                seasonalPackDates[key].getDate(),
            ];
            const label = packsData[key].title
                .replace(/\b(the|pack)\b/gi, "") // Remove "the" and "pack" in any case
                .replace(/\s+/g, " ")            // Replace multiple spaces with a single space
                .trim();
            return {
                label: label,
                state: ownedPacks?.includes(key + "_pack") ? "inactive" : "locked" as "inactive" | "locked",
                onPress: () => changePack(key),
                dateDiff: getClosestDaysDifference(month, day),
            };
        })
        .sort((a, b) => (a.dateDiff || 0) - (b.dateDiff || 0));

    const buttons: ButtonProps[] = [
        { label: "🎉 Free", state: "active", onPress: () => changePack(null) },
        ...sortedSeasonalPacks,
    ];

    if (section === "buttons") {
        return (
            <View paddingBottom={16}>
                <ScrollableButtons ownedPacks={ownedPacks ?? []} buttons={buttons} />
            </View>
        );
    }

    return (
        <View paddingBottom={16}>
            {pack && !(ownedPacks?.includes(pack + "_pack")) ? (
                <View gap={8} paddingTop={8}>
                    <SizableText size={"$8"} fontWeight={900}>
                        {packsData[pack].title}
                    </SizableText>
                    <SizableText size={"$4"} fontWeight={400}>
                        {packsData[pack].description}
                    </SizableText>
                    <Button
                        borderRadius={100}
                        backgroundColor={"$main4"}
                        width={""}
                        onPress={purchasePack}
                    >
                        Unlock {price}
                    </Button>
                </View>
            ) : null}
        </View>
    );
}
