import { View, SizableText } from "tamagui";

interface LibPreviewProps {
    parsedText: string[],
}

/**
 * Takes a lib array and returns a text component with a lib preview
 *
 *
 * @prop parsedText, an array of strings representing a lib
 */
export default function LibPreview({ parsedText }: LibPreviewProps) {
    let libPreview = '';

    for (let i = 0; i < parsedText.length; i++) {
        // Libs that start with a prompt automatically have an empty string at the start,
        // this means we know a lib always starts with a text, followed by a prompt
        if (i % 2 === 1) {
            // Replaces every other index with "_____"
            libPreview += '_____';
        } else {
            // On odd iterations, adding the actual text
            libPreview += parsedText[i];
        }

        // Adds a space, unless the next string is just punctuation (period, comma, semicolon)
        if (i < parsedText.length - 1) {
            const nextItem = parsedText[i + 1];
            if (!nextItem.startsWith('.') && !nextItem.startsWith(',') && !nextItem.startsWith(';')) {
                libPreview += ' ';
            }
        }
    }
    return (
        <View marginTop={-10}>
            <SizableText style={{ width: "100%" }} numberOfLines={3} ellipsizeMode="tail" size={'$4'} fontWeight={400}>{libPreview}</SizableText>
        </View>
    )
}