import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppIcon from '../../assets/AppIcon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from "nativewind"
import CustomText from '../components/CustomText';


export default function SplashScreen() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0
        ring2padding.value = 0
        setTimeout(() =>
            ring1padding.value = withSpring(ring1padding.value + hp(10)), 100)
        setTimeout(() =>
            ring2padding.value = withSpring(ring2padding.value + hp(8.5)), 300)

        setTimeout(() => {
            // toggleColorScheme()
            navigation.replace("Home")
        }, 2500)
    }, [])

    // const base64Svg = base64Encode(SplashBg());
    return (
        <LinearGradient
            className="flex-1 items-center py-20 flex-col"
            colors={[colorScheme === "dark" ? "black" : 'rgba(0,0,0,0.3)', 'black']}
        >
            <StatusBar style={'light'} />
            <View className="flex-1 justify-center space-y-20">
                {/* logo image with ring */}
                <Animated.View className={`${colorScheme === "dark" ? "bg-white/50" : "bg-black/20"} rounded-full`} style={{ padding: ring2padding }}>
                    <Animated.View className={`${colorScheme === "dark" ? "bg-white/40" : "bg-black/20"} rounded-full items-center`} style={{ padding: ring1padding }}>
                        <AppIcon />
                    </Animated.View>
                </Animated.View>

                {/* Tile and punch line */}
                <View className="space-y-2">
                    <CustomText
                        text={"Handy Chef"}
                        styles={{ fontSize: hp(7) }}
                        classes={`text-center font-bold tracking-widest text-white`}
                    />
                    <CustomText
                        text={"Chef in your hands!!!"}
                        styles={{ fontSize: hp(2) }}
                        classes={"text-white text-center font-medium tracking-widest"}
                    />
                </View>
            </View>

        </LinearGradient>
    );
}