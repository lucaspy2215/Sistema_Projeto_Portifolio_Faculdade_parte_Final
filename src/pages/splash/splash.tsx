import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export function Splash() {
    const router = useRouter();
    const animationRef = useRef<LottieView>(null);

    // Fallback: garante navegação mesmo se o onAnimationFinish não disparar
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace('/login');
        }, 5000);
        return () => clearTimeout(timeout);
    }, [router]);

    const handleAnimationFinish = () => {
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <LottieView
                ref={animationRef}
                source={require('../../../assets/animations/splash.json')}
                autoPlay
                loop={false}
                onAnimationFinish={handleAnimationFinish}
                style={styles.animation}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D3D2E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: width,
        height: height,
    },
});