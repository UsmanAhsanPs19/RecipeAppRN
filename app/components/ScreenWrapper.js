import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function ScreenWrapper({ children, mode = "light" }) {
    return (
        <View
            className="flex-1">
            <StatusBar style={mode} />
            {children}
        </View>
    )
}