import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

// Create a component
export const CustomButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.button, props.passedStyle]}
            onPress={() => Alert.alert(props.text + ' button pressed')}
        >
            <Text style={styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5
    },
    registerButton: {
        alignItems: "center",
        backgroundColor: "#FFB800",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5
    },
    textStyle: {
        fontWeight: "bold"
    }
});
