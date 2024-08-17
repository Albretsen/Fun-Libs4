import { View, SizableText } from 'tamagui';
import { ToastConfigParams } from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

/*
  1. Create the config
*/
export const toastConfig = {
    success: ({ text1, text2 }: { text1: string, text2: string }) => (
        <View backgroundColor={"$main5"} style={[styles.toastContainer]}>
            <SizableText size={'$5'}>{text1}</SizableText>
            <SizableText size={'$2'}>{text2}</SizableText>
        </View>
    ),

    error: ({ text1, text2 }: { text1: string, text2: string }) => (
        <View style={[styles.toastContainer, { backgroundColor: 'tomato', }]}>
            <SizableText size={'$5'}>{text1}</SizableText>
            <SizableText size={'$2'}>{text2}</SizableText>
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        width: "60%",
        paddingVertical: 10,
        paddingHorizontal: 26,
        borderRadius: 9999
    }
})