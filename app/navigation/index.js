import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';

const MainScreens = createNativeStackNavigator();
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <MainScreens.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <MainScreens.Screen name='Splash' component={SplashScreen} />
                <MainScreens.Screen name='Home' component={HomeScreen} />

            </MainScreens.Navigator>
        </NavigationContainer>
    )
}