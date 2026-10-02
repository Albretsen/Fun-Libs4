import { XStack, YStack, SizableText } from 'tamagui';
import { ToastConfigParams } from 'react-native-toast-message';
import { AlertCircle, CheckCircle2 } from '@tamagui/lucide-icons';

// Radix red9 / green9: readable on both light and dark backgrounds.
const ERROR_COLOR = '#E5484D';
const SUCCESS_COLOR = '#30A46C';

function ToastCard({ text1, text2, accent, Icon }: {
    text1?: string;
    text2?: string;
    accent: string;
    Icon: typeof AlertCircle;
}) {
    return (
        <XStack
            width="90%"
            maxWidth={420}
            alignItems="center"
            gap="$3"
            paddingVertical="$3"
            paddingHorizontal="$3.5"
            borderRadius="$5"
            backgroundColor="$background"
            borderWidth={1}
            borderColor="$main6"
            borderLeftWidth={4}
            borderLeftColor={accent}
            shadowColor="#000"
            shadowOpacity={0.12}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 4 }}
            elevation={4}
        >
            <Icon size={22} color={accent} />
            <YStack flex={1} gap="$0.5">
                {text1 ? <SizableText size="$4" fontWeight="700" color="$main12">{text1}</SizableText> : null}
                {text2 ? <SizableText size="$3" color="$main12" opacity={0.75}>{text2}</SizableText> : null}
            </YStack>
        </XStack>
    );
}

export const toastConfig = {
    success: ({ text1, text2 }: ToastConfigParams<any>) => (
        <ToastCard text1={text1} text2={text2} accent={SUCCESS_COLOR} Icon={CheckCircle2} />
    ),
    error: ({ text1, text2 }: ToastConfigParams<any>) => (
        <ToastCard text1={text1} text2={text2} accent={ERROR_COLOR} Icon={AlertCircle} />
    ),
};
