import React from 'react';
import { View, SizableText, XStack, useTheme } from 'tamagui';
import { Animated, Easing } from 'react-native';

const SkeletonCard = () => {
    const theme = useTheme();

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
        outputRange: [theme.main4.val, theme.main6.val],
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
        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 16, borderColor: theme.main6.val }}>
            <View style={{ margin: 16 }}>
                <View style={{ width: '100%', height: 100, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                    <Animated.View style={[shimmerStyle, { opacity: 0.7 }]} />
                </View>
                <XStack gap={16}>
                    <View width={48} height={48} backgroundColor={theme.main6.val} borderRadius={1000}></View>
                    <View flex={1}>
                        <SizableText size={'$8'} fontWeight={900} style={{ width: '80%', backgroundColor: theme.main6.val, marginBottom: 16 }}></SizableText>
                        <SizableText size={'$4'} fontWeight={400} style={{ width: '50%', backgroundColor: theme.main6.val, marginBottom: 16 }}></SizableText>
                    </View>
                </XStack>
                <View style={{ width: '100%', height: 1, backgroundColor: theme.main6.val, marginTop: -12, marginBottom: 16 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: 100, height: 16, backgroundColor: theme.main6.val, marginBottom: 16 }}></View>
                    <View style={{ width: 80, height: 36, borderRadius: 100, backgroundColor: theme.main6.val }}></View>
                </View>
            </View>
        </View>
    );
};

export default SkeletonCard;
