import { View, SizableText } from 'tamagui';

/*
  1. Create the config
*/
export const toastConfig = {
    success: ({ text1, text2 }: { text1: string, text2: string }) => (
        <View style={{ height: 'auto', width: '100%', backgroundColor: 'lightgreen', padding: 16 }}>
            <SizableText size={'$2'}>{text1}</SizableText>
            <SizableText>{text2}</SizableText>
        </View>
    ),

    error: ({ text1, text2 }: { text1: string, text2: string }) => (
        <View style={{ height: 'auto', width: '100%', backgroundColor: 'tomato', padding: 16 }}>
            <SizableText size={'$2'}>{text1}</SizableText>
            <SizableText>{text2}</SizableText>
        </View>
    ),
};