import React, { useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

import { CustomButton } from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native';
import { getAuth } from '@firebase/auth';

const image = require('./../assets/img/eduardo-cano-photo-co-AzX5iNFYBMY-unsplash.jpg');

const LoggedOut = () => {
    const navigation = useNavigation();
    const auth = getAuth();


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && user.emailVerified) {
                navigation.navigate("Home");
            }
        })
        return unsubscribe;
    }, []);



    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
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
        </SafeAreaView>
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
        flex: 8,
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
