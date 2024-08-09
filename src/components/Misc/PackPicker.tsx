import { usePackStore } from "../../hooks/usePackStore";
import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";

export default function PackPicker() {

    const { setPack } = usePackStore();

    const changePack = (pack: string | null) => {
        setPack(pack);
    }

    return (
        <ScrollableButtons buttons={
            [
                { label: "Free", state: "active", onPress: () => { changePack(null) } },
                { label: "❤️ Romantic", state: "inactive", onPress: () => { changePack("romance") } },
                { label: "🚀 History", state: "locked", onPress: () => { changePack("historic") } },
            ]
        } />
    )
}