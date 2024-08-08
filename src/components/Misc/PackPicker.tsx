import ScrollableButtons from "../ScrollableButtons/ScrollableButtons";

export default function PackPicker() {

    return (
        <ScrollableButtons buttons={[{ label: "Free", state: "active" }, { label: "❤️ Romantic", state: "inactive" }, { label: "🚀 History", state: "locked" }]} />
    )
}