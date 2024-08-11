import { usePackStore } from "../../hooks/usePackStore";
import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";
import useIAP from "../../hooks/useIAP";

export default function PackPicker() {
    useIAP();

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