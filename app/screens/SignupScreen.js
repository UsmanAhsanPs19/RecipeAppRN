import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useColorScheme } from "nativewind"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import CustomText from '../components/CustomText'
import GoogleIcon from '../../assets/GoogleIcon'
import FacebookIcon from '../../assets/FacebookIcon'
import { useNavigation } from '@react-navigation/native'

const SignupScreen = () => {
    const navigation = useNavigation();
    const { colorScheme } = useColorScheme();
    return (
        <ScrollView
            className="bg-white"
            style={{ flex: 1 }}
        >
            <View className="flex-1 space-y-2 justify-center px-5 py-10 bg-white">

                {/* Welcome Text */}
                <View className="my-3">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        className={`${colorScheme === "dark" ? "bg-white" : "bg-amber-300"} py-2 px-3 rounded-xl flex-row items-center self-start`}>
                        <ChevronLeftIcon size={hp(3.5)} color={"black"} strokeWidth={4} />
                        <CustomText
                            text={"Back"}
                            classes={`text-left font-normal tracking-widest ${colorScheme === "dark" ? "text-white" : "text-neutral-800"}`}
                            styles={{
                                fontSize: hp(1.8)
                            }}
                        />
                    </TouchableOpacity>
                    <View>
                        <CustomText
                            text={"Create an account"}
                            classes={`text-left font-semibold tracking-widest ${colorScheme === "dark" ? "text-white" : "text-amber-300"}`}
                            styles={{
                                fontSize: hp(3.7)
                            }}
                        />
                        <CustomText
                            text={"Let's help you set up your account,\nit won't take long"}
                            classes={`mt-2 text-left font-normal tracking-widest ${colorScheme === "dark" ? "text-white" : "text-neutral-600"}`}
                            styles={{
                                fontSize: hp(1.8)
                            }}
                        />
                    </View>
                </View>

                {/* Registration fileds field */}
                <View className="space-y-5">
                    {/* User Name Field */}
                    <View className="space-y-2">
                        <CustomText
                            text={"Name"}
                            classes={`text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                            styles={{
                                fontSize: hp(2)
                            }}
                        />
                        <View className={`flex-row items-center rounded-2xl ${colorScheme === "dark" ? "bg-white/5" : "bg-black/5"} p-[20px]`}>
                            <TextInput
                                placeholder='Enter full name'
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(1.7) }}
                                className="flex-1 text-base mb-1 pl-3 tracking-wider"
                            />
                        </View>
                    </View>
                    {/* Email Field */}
                    <View className="space-y-2">
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
                    <View className="space-y-2">
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
                    {/* Password Field */}
                    <View className="space-y-2">
                        <CustomText
                            text={"Confirm Password"}
                            classes={`text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                            styles={{
                                fontSize: hp(2)
                            }}
                        />
                        <View className={`flex-row items-center rounded-2xl ${colorScheme === "dark" ? "bg-white/5" : "bg-black/5"} p-[20px]`}>
                            <TextInput
                                placeholder='Enter Password again'
                                secureTextEntry
                                placeholderTextColor={'gray'}
                                style={{ fontSize: hp(1.7) }}
                                className="flex-1 text-base mb-1 pl-3 tracking-wider"
                            />
                        </View>
                    </View>

                    {/* Forgot password */}
                    <View>
                        <CustomText
                            text={"Forgot Password?"}
                            classes={`mx-4 text-left font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-amber-300"}`}
                            styles={{
                                fontSize: hp(2)
                            }}
                        />
                    </View>
                    {/* Login Button */}

                    <View className={`flex-row rounded-2xl ${colorScheme === "dark" ? "bg-white/5" : "bg-amber-300"} p-[20px] justify-center`}>
                        <CustomText
                            text={"Signup"}
                            classes={`font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                            styles={{
                                fontSize: hp(2.5)
                            }}
                        />
                    </View>

                    {/* Container label for signup section */}
                    <View className={`flex-row justify-center`}>
                        <CustomText
                            text={"Or Sign up with"}
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

                    {/* Option for Login */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <CustomText
                            text={"Login Here"}
                            classes={`text-center font-medium tracking-widest ${colorScheme === "dark" ? "text-white" : "text-amber-400"}`}
                            styles={{
                                fontSize: hp(2)
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignupScreen;