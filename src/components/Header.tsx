import { Text, Input, View } from "tamagui";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                header: () => <SafeAreaView><Text>TEST</Text><Input></Input></SafeAreaView>
            }}
        />
    )
}