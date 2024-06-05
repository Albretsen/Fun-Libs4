import { Text } from "tamagui";

export default function ListItem(props: any) {
    const { item } = props;

    return (
        <Text>{item.title}</Text>
    )
}