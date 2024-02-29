import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useColorScheme } from "nativewind"
import Animated, { FadeInDown } from 'react-native-reanimated';
import axios from "axios"

export default function Categories({ activeCategory, setActiveCategory }) {
    const [categories, setCategories] = useState([])
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        setIsLoading(true)
        axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(response => {
                setIsLoading(false)
                if (response.data && response.data.categories) {

                    setCategories(response.data?.categories || [])
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log("Categoreis API Error::", error)
            })
    }

    return (
        <>
            {isLoading && <ActivityIndicator size={"large"} color={colorScheme === "dark" ? "white" : "black"} />}
            {!isLoading && categories.length > 0 && <Animated.View entering={FadeInDown.duration(1500).springify()}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="space-x-4"
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    {
                        categories.map((cat, index) => {
                            let isActive = cat.strCategory === activeCategory;
                            let activeButtonClass = isActive ? colorScheme === "dark" ? "p-[7px] bg-white" : "p-[7px] bg-amber-100" : "p-[6px] transparent";
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setActiveCategory(cat.strCategory)
                                    }}
                                    className="flex items-center space-y-1"
                                >
                                    <View className={"rounded-full border-solid border-red-500 " + activeButtonClass}>
                                        <Image
                                            source={{ uri: cat.strCategoryThumb }}
                                            style={{ width: hp(6), height: hp(6) }}
                                            className="rounded-full"
                                        />
                                    </View>
                                    <Text
                                        style={{ fontSize: hp(1.6) }}
                                        className={`${colorScheme === "dark" ? "text-white" : "text-neutral-600"}`}>{cat.strCategory}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </Animated.View>}
        </>
    )
}