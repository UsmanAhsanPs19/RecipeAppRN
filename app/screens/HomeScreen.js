import { View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from "nativewind"
import { UserCircleIcon, BellIcon, SunIcon, MoonIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import CustomText from '../components/CustomText'
import Categories from '../components/categories'
import Recipe from '../components/recipe'

export default function HomeScreen() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [activeCategory, setActiveCategory] = useState("Beef")
    return (
        <View className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"} pt-14`}>
            <StatusBar style={colorScheme === "dark" ? "light" : 'dark'} />
            {/* hello & avatar & bell icons */}
            <View className="mx-4 flex-row justify-between my-2">
                {/* Hello text and user name */}
                <View className="space-y-2">
                    <CustomText
                        text={"Hello"}
                        classes={`text-left font-bold tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                        styles={{
                            fontSize: hp(3.5)
                        }}
                    />
                    <CustomText
                        text={"Usman"}
                        classes={`text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                        styles={{
                            fontSize: hp(2.7)
                        }}
                    />
                </View>
                {/* Right side bell icon etc.. */}
                <View className="flex-row items-start justify-center space-x-1">
                    <TouchableOpacity
                        onPress={() => toggleColorScheme()}
                        style={{ padding: wp(1) }}>
                        {colorScheme === "dark" ? <MoonIcon size={hp(3.5)} color={colorScheme === "dark" ? "white" : "black"} /> : <SunIcon size={hp(3.5)} color={colorScheme === "dark" ? "white" : "black"} />}
                    </TouchableOpacity>
                    <View style={{ padding: wp(1) }}>
                        <BellIcon size={hp(3.5)} color={colorScheme === "dark" ? "white" : "black"} />
                    </View>
                    <View className={`${colorScheme === "dark" ? "transparent" : "bg-amber-300"} rounded-lg`} style={{ padding: wp(1) }}>
                        <UserCircleIcon size={hp(3.5)}
                            color={colorScheme === "dark" ? "white" : "black"} />
                    </View>

                </View>
            </View>
            <View
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(1) }}
                className="space-y-6"
            >
                {/* Search bar */}
                <View className={`m-4 flex-row items-center rounded-full ${colorScheme === "dark" ? "bg-white/5" : "bg-black/5"} p-[10px]`}>
                    <MagnifyingGlassIcon color={'gray'} strokeWidth={1} size={hp(2.5)} />
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    />

                </View>
                {/* Categories listing */}
                <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                {/* Recipe section */}

                <Recipe category={activeCategory} />
            </View>
        </View>
    )
}