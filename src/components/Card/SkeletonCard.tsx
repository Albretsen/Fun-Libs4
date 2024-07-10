import React from 'react';
import { View, SizableText } from 'tamagui';
import { Animated, Easing } from 'react-native';

const SkeletonCard = () => {
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
        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 16, borderColor: '#f0f0f0' }}>
            <View style={{ margin: 16 }}>
                <View style={{ width: '100%', height: 100, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                    <Animated.View style={[shimmerStyle, { opacity: 0.7 }]} />
                </View>
                <SizableText size={'$8'} fontWeight={900} style={{ width: '80%', backgroundColor: '#f0f0f0', marginBottom: 16 }}></SizableText>
                <SizableText size={'$4'} fontWeight={400} style={{ width: '50%', backgroundColor: '#f0f0f0', marginBottom: 16 }}></SizableText>
                <View style={{ width: '100%', height: 1, backgroundColor: '#f0f0f0', marginTop: -12, marginBottom: 16 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: 100, height: 16, backgroundColor: '#f0f0f0', marginBottom: 16 }}></View>
                    <View style={{ width: 80, height: 36, borderRadius: 100, backgroundColor: '#f0f0f0' }}></View>
                </View>
            </View>
        </View>
    );
};

export default SkeletonCard;
