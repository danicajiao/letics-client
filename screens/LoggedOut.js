import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

import { CustomButton } from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native';

const image = require('./../assets/img/eduardo-cano-photo-co-AzX5iNFYBMY-unsplash.jpg');

const LoggedOut = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.darkenImage}>
                    <Image style={styles.logo} source={require('./../assets/img/logo.png')} />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.registerButton]}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={[styles.buttonText, styles.registerText]}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1
    },
    darkenImage: {
        flex: 7,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    logo: {
        width: 250,
        resizeMode: "contain"
    },
    buttons: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 10
    },
    button: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold'
    },
    registerButton: {
        backgroundColor: "#FFB800",
        borderColor: "#FFB800"
    },
    registerText: {
        color: '#ffffff'
    }
});

export default LoggedOut;
