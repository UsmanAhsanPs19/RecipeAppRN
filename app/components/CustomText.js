import React from "react";
import { Text } from "react-native";

export default function CustomText({ classes, styles, text }) {
    return <Text style={styles} className={classes}>{text}</Text>
}