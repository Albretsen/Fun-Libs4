import { View, SizableText } from 'tamagui';
import { ToastConfigParams } from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

export const toastConfig = {
    success: ({ text1, text2 }: ToastConfigParams<any>) => (
        <View backgroundColor={"$main5"} style={[styles.toastContainer]}>
            <SizableText size={'$5'}>{text1}</SizableText>
            {text2 ? <SizableText size={'$2'}>{text2}</SizableText> : null}
        </View>
    ),
    error: ({ text1, text2 }: ToastConfigParams<any>) => (
        <View style={[styles.toastContainer, { backgroundColor: 'tomato' }]}>
            <SizableText size={'$5'}>{text1}</SizableText>
            {text2 ? <SizableText size={'$2'}>{text2}</SizableText> : null}
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        width: "60%",
        paddingVertical: 10,
        paddingHorizontal: 26,
        borderRadius: 9999,
    },
});
