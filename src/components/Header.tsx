import { Text, Input, View } from "tamagui";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                header: (props) => <SafeAreaView><Text>{JSON.stringify(props)}</Text><Input></Input></SafeAreaView>
            }}
        />
    )
}