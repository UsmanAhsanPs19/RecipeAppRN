import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useColorScheme } from "nativewind"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { } from "react-native-heroicons/outline"
import CustomText from '../components/CustomText'
import GoogleIcon from '../../assets/GoogleIcon'
import FacebookIcon from '../../assets/FacebookIcon'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigation = useNavigation();
    const { colorScheme } = useColorScheme();
    return (
        <View className="flex-1 space-y-2 justify-center px-5 py-10 bg-white">
            {/* Welcome Text */}
            <View className="my-10">
                <CustomText
                    text={"Hello,"}
                    classes={`text-left font-bold tracking-widest ${colorScheme === "dark" ? "text-white" : "text-amber-300"}`}
                    styles={{
                        fontSize: hp(4)
                    }}
                />
                <CustomText
                    text={"Welcome Back!"}
                    classes={`text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                    styles={{
                        fontSize: hp(2.5)
                    }}
                />
            </View>

            {/* Email and Password field */}
            <View className="space-y-8">
                {/* Email Field */}
                <View className="space-y-3">
                    <CustomText
                        text={"Email"}
                        classes={`text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                        styles={{
                            fontSize: hp(2)
                        }}
                    />
                    <View className={`flex-row items-center rounded-2xl ${colorScheme === "dark" ? "bg-white/5" : "bg-black/5"} p-[20px]`}>
                        <TextInput
                            placeholder='Enter Email'
                            placeholderTextColor={'gray'}
                            style={{ fontSize: hp(1.7) }}
                            className="flex-1 text-base mb-1 pl-3 tracking-wider"
                        />
                    </View>
                </View>
                {/* Password Field */}
                <View className="space-y-3">
                    <CustomText
                        text={"Password"}
                        classes={`text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                        styles={{
                            fontSize: hp(2)
                        }}
                    />
                    <View className={`flex-row items-center rounded-2xl ${colorScheme === "dark" ? "bg-white/5" : "bg-black/5"} p-[20px]`}>
                        <TextInput
                            placeholder='Enter Password'
                            secureTextEntry
                            placeholderTextColor={'gray'}
                            style={{ fontSize: hp(1.7) }}
                            className="flex-1 text-base mb-1 pl-3 tracking-wider"
                        />
                    </View>
                </View>

                {/* Forgot password */}
                <CustomText
                    text={"Forgot Password?"}
                    classes={`m-4 text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-amber-300"}`}
                    styles={{
                        fontSize: hp(2)
                    }}
                />

                {/* Login Button */}

                <View className={`flex-row rounded-2xl ${colorScheme === "dark" ? "bg-white/5" : "bg-amber-300"} p-[20px] justify-center`}>
                    <CustomText
                        text={"Login"}
                        classes={`font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                        styles={{
                            fontSize: hp(2.5)
                        }}
                    />
                </View>

                {/* Container label for signup section */}
                <View className={`flex-row justify-center`}>
                    <CustomText
                        text={"Or Sign in with"}
                        classes={`font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-gray-400"}`}
                        styles={{
                            fontSize: hp(1.7)
                        }}
                    />
                </View>

                {/* Social login */}
                <View className="flex-row space-x-4 justify-center items-center">
                    <View className="bg-white p-2 shadow-md rounded-lg">
                        <GoogleIcon />
                    </View>
                    <View className="bg-white p-2 shadow-md rounded-lg">
                        <FacebookIcon />
                    </View>
                </View>

                {/* Option for signup */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Signup')
                    }}
                >
                    <CustomText
                        text={"Create Account?"}
                        classes={`text-center font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-amber-400"}`}
                        styles={{
                            fontSize: hp(2)
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen