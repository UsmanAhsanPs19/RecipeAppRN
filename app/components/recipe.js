import { View, Text, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from './CustomText'
import { useColorScheme } from "nativewind"
import Animated, { FadeInDown } from 'react-native-reanimated';
import axios from "axios"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import CachedImageCmp from '../helpers/CachedImageCmp';
import { useNavigation } from '@react-navigation/native';

export default function Recipe({ category }) {
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState([])
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getRecpies();
    }, [category])

    function getRecpies() {
        setIsLoading(true)
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(response => {
                setIsLoading(false)
                if (response.data && response.data.meals) {
                    setRecipes(response.data?.meals || [])
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log("Categoreis API Error::", error)
            })
    }

    return (
        <View
            className="px-4 my-3 space-y-3">
            <CustomText
                text={"Recipe"}
                classes={`text-xl text-wider ${colorScheme === "dark" ? "text-white" : "text-black"}`}
            />
            {isLoading && <ActivityIndicator size={"large"} color={colorScheme === "dark" ? "white" : "black"} />}
            {!isLoading && <FlatList
                data={recipes}
                renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation={navigation} />}
                numColumns={2}
                keyExtractor={(item) => item.idMeal}
                ListEmptyComponent={
                    <Text className="text-xs flex-1 text-center items-center self-center">There is no recipe. Please try diffrent category.</Text>
                }
            />}
        </View>
    )
}

const RecipeCard = ({ item, index, navigation }) => {
    const { colorScheme } = useColorScheme();
    const isEven = index % 2 == 0;
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}
            style={{ width: "100%", paddingRight: isEven ? wp(1.5) : 0, paddingLeft: isEven ? 0 : wp(1.5) }}
            className="flex-1"
        >
            <Pressable
                style={{ width: "100%" }}
                onPress={() => {
                    navigation.navigate('RecipeDetail', { ...item })
                }}
                className="space-y-2 mb-4 justify-center">
                <CachedImageCmp
                    uri={item.strMealThumb}
                    style={{ width: "100%", height: hp(35) }}
                    sharedTransitionTag={item.idMeal}
                    className={`${colorScheme === "dark" ? "bg-white/5" : "bg-black/5"} rounded-3xl`}
                />
                <CustomText
                    style={{ fontSize: hp(1.5) }}
                    classes={`mt-2 font-semibold ml-2 ${colorScheme === "dark" ? "text-white" : "text-neutral-600"}`}
                    text={item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                />
            </Pressable>
        </Animated.View>
    )
}