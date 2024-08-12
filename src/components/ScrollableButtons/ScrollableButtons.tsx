import React, { useState } from 'react';
import { ScrollView, View, XStack } from 'tamagui';
import Button from './Button';


interface ButtonProps {
    label: string;
    state: 'active' | 'inactive' | 'locked';
    onPress: () => void;
}

interface ScrollableButtonsProps {
    buttons: ButtonProps[];
}

export default function ScrollableButtons(props: ScrollableButtonsProps) {
    const { buttons } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index: number, onPress: () => void, state: string | null) => {
        if (state !== 'locked') {
            setActiveIndex(index);
        }
        onPress();
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <ScrollView horizontal>
                <XStack gap={16}>
                    {buttons ? buttons.map((element, index) => {
                        const isActive = index === activeIndex;
                        const state = element.state === 'locked' ? 'locked' : (isActive ? 'active' : 'inactive');
                        return (
                            <Button
                                label={element.label}
                                state={state}
                                onPress={() => handlePress(index, element.onPress, element.state)}
                                key={index}
                            />
                        );
                    }) : null}
                </XStack>
            </ScrollView>
        </View>
    );
}
