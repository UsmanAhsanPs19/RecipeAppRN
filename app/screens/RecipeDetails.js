import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from "nativewind"
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon, ClockIcon, FireIcon, UserCircleIcon, HomeModernIcon } from "react-native-heroicons/outline"
import Animated, { FadeInRight, FadeOutDown } from 'react-native-reanimated';
import { HeartIcon, UsersIcon, Square3Stack3DIcon } from "react-native-heroicons/solid"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import CachedImageCmp from '../helpers/CachedImageCmp';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import CustomText from '../components/CustomText';

const RecipeDetails = (props) => {
    const item = props.route.params;
    const navigation = useNavigation();
    const [meal_details, setMealDetails] = useState(null)
    const [isFavourite, setIsFavourite] = useState(false);
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false)
    console.log("item:", item)
    const tabs = ["Ingredients", "Measures", "Instructions"]
    const [current_step, set_current_step] = useState("Ingredients");

    useEffect(() => {
        if (item) {
            getFulMeal(item.idMeal);
        }
    }, [item])

    function getFulMeal(meal_id) {
        setIsLoading(true)
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
            .then(response => {
                setIsLoading(false)
                if (response.data && response.data.meals?.length) {
                    setMealDetails(response.data?.meals[0] || null)
                }
                else {
                    setMealDetails(null)
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log("Categoreis API Error::", error)
            })
    }

    return (
        <ScrollView
            className={`${colorScheme === "dark" ? 'bg-black' : 'bg-white'} flex-1`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            {/* Status bar */}
            <StatusBar style={'light'} />

            {/* Recipe Image */}
            <View className="flex-row justify-center">
                <CachedImageCmp
                    uri={item.strMealThumb}
                    // sharedTransitionTag={item.idMeal}
                    style={{ width: wp(98), height: hp(35), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginVertical: hp(1 / 2) }}
                />
            </View>

            {/* Back and favourite button */}
            <View className="w-full absolute flex-row justify-between items-center pt-14 px-3">
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    className="bg-white p-3 rounded-full">
                    <ChevronLeftIcon size={hp(3.5)} color={"orange"} strokeWidth={4} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIsFavourite(prev => !prev);
                    }}
                    className="bg-white p-3 rounded-full">
                    <HeartIcon size={hp(3.5)} color={isFavourite ? "red" : "gray"} strokeWidth={4} />
                </TouchableOpacity>
            </View>

            {/* Show loader and meal data */}
            <View>
                {isLoading ? <ActivityIndicator size={"large"} color={colorScheme === "dark" ? "white" : "black"} />
                    :
                    <View className="mt-3 px-4  space-y-4 justify-between flex">

                        {/* Label and area */}
                        <View className="space-y-4">
                            <CustomText
                                text={meal_details?.strMeal}
                                styles={{ fontSize: hp(3) }}
                                classes={`font-bold flex-1 ${colorScheme === "dark" ? "text-white" : "text-neutral-700"}`} />
                            <View className="flex-row items-center space-y-2 space-x-2">
                                <View className={`${colorScheme === "dark" ? "transparent" : "bg-amber-300"} rounded-lg self-center`} style={{ padding: wp(1) }}>
                                    <UserCircleIcon size={hp(5)}
                                        color={colorScheme === "dark" ? "white" : "black"} />
                                </View>
                                <View className="justify-center space-y-1">
                                    <CustomText
                                        styles={{ fontSize: hp(2.5) }}
                                        classes={`font-medium flex-1 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                                        text={"Usman Ahsan"}
                                    />
                                    <View className="flex-row items-center">
                                        <HomeModernIcon
                                            size={hp(2)}
                                            color={colorScheme == "dark" ? "white" : "black"} />
                                        <CustomText
                                            styles={{ fontSize: hp(2) }}
                                            classes={`ml-2 font-normal ${colorScheme === "dark" ? "text-white" : "text-neutral-500"}`}
                                            text={meal_details?.strArea}
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>
                        {/* Other details about the product */}
                        <View className="flex-row justify-between">
                            {/* Total time for thsi recipe */}
                            <View className={`flex rounded-full ${colorScheme === "dark" ? "bg-white / 2" : "bg-amber-400"} p-2 items-center`}>
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className={`${colorScheme === "dark" ? "bg-black" : "bg-white"} rounded-full flex items-center justify-center`}>
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color={colorScheme === "dark" ? "white" : "black"} />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <CustomText styles={{ fontSize: hp(2) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"35"}
                                    />
                                    <CustomText styles={{ fontSize: hp(1.3) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"Min"} />
                                </View>
                            </View>

                            {/* How much person can eat this */}
                            <View className={`flex rounded-full ${colorScheme === "dark" ? "bg-white / 2" : "bg-amber-400"} p-2`}>
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className={`${colorScheme === "dark" ? "bg-black" : "bg-white"} rounded-full flex items-center justify-center`}>
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color={colorScheme === "dark" ? "white" : "black"} />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <CustomText styles={{ fontSize: hp(2) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"03"}
                                    />
                                    <CustomText styles={{ fontSize: hp(1.3) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"Servings"} />
                                </View>
                            </View>

                            {/* Total Caleroies */}
                            <View className={`flex rounded-full ${colorScheme === "dark" ? "bg-white / 2" : "bg-amber-400"} p-2`}>
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className={`${colorScheme === "dark" ? "bg-black" : "bg-white"} rounded-full flex items-center justify-center`}>
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color={colorScheme === "dark" ? "white" : "black"} />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <CustomText styles={{ fontSize: hp(2) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"120"}
                                    />
                                    <CustomText styles={{ fontSize: hp(1.3) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"Cal"} />
                                </View>
                            </View>

                            {/* Recipe is easy or hard */}
                            <View className={`flex rounded-full ${colorScheme === "dark" ? "bg-white / 2" : "bg-amber-400"} p-2`}>
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className={`${colorScheme === "dark" ? "bg-black" : "bg-white"} rounded-full flex items-center justify-center`}>
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={colorScheme === "dark" ? "white" : "black"} />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <CustomText styles={{ fontSize: hp(2) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={""}
                                    />
                                    <CustomText styles={{ fontSize: hp(1.3) }} classes={`font-bold ${colorScheme === "dark" ? "text-neutral-500" : "text-white"}`}
                                        text={"Easy"} />
                                </View>
                            </View>

                        </View>

                        {/* Tabs for ingredients, cooking and steps */}
                        <View className="my-3 flex-1 flex-row justify-evenly items-center space-x-1">
                            {tabs.map((item, index) => (
                                <Animated.View
                                    style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            set_current_step(item)
                                        }}
                                        className={`${current_step === item ? colorScheme === "dark" ? "bg-white" : "bg-amber-400" : colorScheme === "dark" ? " border-white border-2" : "border-amber-400 border-2"} border-solid flex-1 rounded-lg p-4 items-center justify-center`}>
                                        <Text
                                            style={{ fontSize: hp(1.5) }}
                                            className={`${colorScheme === "data" ? "text-neutral-800" : current_step !== item ? "text-amber-500" : "text-neutral-800"} font-medium`}>{item}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}

                        </View>

                        {/* Show tabs data */}
                        <View className="flex-1 justify-center">
                            {tabs[0] === current_step && <View className="space-x-2 items-center flex-row">
                                <View className={`${colorScheme === "dark" ? "border-white" : "border-gray-200"} px-4 py-2 space-x-2 flex border-2 rounded-full items-center justify-center`}>
                                    <Text style={{ fontSize: hp(1.8) }}
                                        className={`${colorScheme === "dark" ? "text-white" : 'text-black'} font-semibold`}
                                    >{meal_details?.strIngredient1}</Text>
                                </View>
                                <View className={`${colorScheme === "dark" ? "border-white" : "border-gray-200"} px-4 py-2 space-x-2 flex border-2 rounded-full items-center justify-center`}>
                                    <Text style={{ fontSize: hp(1.8) }}
                                        className={`${colorScheme === "dark" ? "text-white" : 'text-black'} font-semibold`}
                                    >{meal_details?.strIngredient1}</Text>
                                </View>
                            </View>}
                            {tabs[1] === current_step && <View className="space-x-2 items-center flex-row">
                                <View className={`${colorScheme === "dark" ? "border-white" : "border-gray-200"} px-4 py-2 space-x-2 flex border-2 rounded-full items-center justify-center`}>
                                    <Text style={{ fontSize: hp(1.8) }}
                                        className={`${colorScheme === "dark" ? "text-white" : 'text-black'} font-semibold`}
                                    >{meal_details?.strMeasure1}</Text>
                                </View>
                                <View className={`${colorScheme === "dark" ? "border-white" : "border-gray-200"} px-4 py-2 space-x-2 flex border-2 rounded-full items-center justify-center`}>
                                    <Text style={{ fontSize: hp(1.8) }}
                                        className={`${colorScheme === "dark" ? "text-white" : 'text-black'} font-semibold`}
                                    >{meal_details?.strMeasure2}</Text>
                                </View>
                            </View>}
                            {tabs[2] === current_step && <View className="space-x-2 items-center flex-row">
                                <View className={`${colorScheme === "dark" ? "border-white" : "border-gray-200"} px-4 py-2 space-x-2 flex border-2 rounded-lg items-center justify-center`}>
                                    <Text style={{ fontSize: hp(1.8) }}
                                        className={`${colorScheme === "dark" ? "text-white" : 'text-black'} font-medium`}
                                    >{meal_details?.strInstructions}</Text>
                                </View>
                            </View>}
                        </View>
                    </View>
                }

            </View>

        </ScrollView>
    )
}

export default RecipeDetails