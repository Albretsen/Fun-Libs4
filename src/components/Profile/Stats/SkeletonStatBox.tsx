import React from 'react';
import { View, SizableText, XStack } from 'tamagui';
import { Animated, Easing } from 'react-native';
import { Spinner } from 'tamagui';

const SkeletonStatBox = () => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const breathingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
            ])
        );
        breathingAnimation.start();
        return () => breathingAnimation.stop();
    }, [fadeAnim]);

    const backgroundColor = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#e0e0e0', '#f0f0f0'],
    });

    const shimmerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor,
    };

    return (
        <View
            flex={1}
            // Modify aspect ratio to change box height
            aspectRatio={1.3}
            backgroundColor={'$main2'}
            padding={10}
            borderWidth={1}
            borderRadius={10}
            borderColor={'$main6'}
            justifyContent="center">
            <View alignItems="center" gap={10}>
                <Spinner color={'$main12'} />
                <SizableText></SizableText>
            </View>
        </View >
    );
};

export default SkeletonStatBox;
