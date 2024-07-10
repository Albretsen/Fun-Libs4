import React from 'react';
import { View, SizableText } from 'tamagui';
import { Animated } from 'react-native';

const SkeletonCard = () => {
    const shimmerTranslateX = new Animated.Value(-150);

    React.useEffect(() => {
        const shimmerAnimation = Animated.loop(
            Animated.timing(shimmerTranslateX, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        shimmerAnimation.start();
        return () => shimmerAnimation.stop();
    }, []);

    const shimmerStyle = {
        position: 'absolute',
        top: 0,
        left: -150,
        width: '250%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        transform: [{ translateX: shimmerTranslateX }],
    };

    return (
        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 16 }}>
            <View style={{ margin: 16 }}>
                <View style={{ width: '100%', height: 200, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                    <Animated.View style={[shimmerStyle]} />
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
