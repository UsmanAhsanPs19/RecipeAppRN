import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react'
import Animated from "react-native-reanimated";


export default function CachedImageCmp(props) {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCahchedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData })
        }
        else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            }
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data })
        }
      } catch (error) {
        console.log("Error CachedData::::", error);
      }
    }
    getCahchedImage();
  }, [])

  return <Animated.Image source={cachedSource} {...props} />
}