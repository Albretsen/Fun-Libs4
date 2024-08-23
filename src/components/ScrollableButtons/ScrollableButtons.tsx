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
    ownedPacks: string[];
}

export default function ScrollableButtons(props: ScrollableButtonsProps) {
    const { buttons } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index: number, onPress: () => void, state: string | null) => {
        setActiveIndex(index);
        onPress();
    };

    // Sort the buttons array: Move locked buttons to the end
    const sortedButtons = buttons.sort((a, b) => {
        if (a.state === 'locked' && b.state !== 'locked') return 1;
        if (a.state !== 'locked' && b.state === 'locked') return -1;
        return 0; // Maintain the original order if both are locked or both are not locked
    });

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <XStack gap={16}>
                    {sortedButtons.map((element, index) => {
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
                    })}
                </XStack>
            </ScrollView>
        </View>
    );
}
