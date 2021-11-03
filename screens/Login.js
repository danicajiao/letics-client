import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

import { CustomButton } from './../components/CustomButton'

const image = require('./../assets/img/eduardo-cano-photo-co-AzX5iNFYBMY-unsplash.jpg');

const Login = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.darkenImage}>
                    <Image style={styles.logo} source={require('./../assets/img/logo.png')} />
                </View>
                <View style={styles.buttons}>
                    <CustomButton text={'LOG IN'} />
                    <CustomButton
                        text={'REGISTER'}
                        buttonStyles={styles.registerButton}
                        textStyles={styles.registerText}
                    />
                    {/* <TouchableOpacity style={styles.loginButton} onPress={() => Alert.alert('Log In button pressed')}>
                        <Text style={styles.textStyle1}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton} onPress={() => Alert.alert('Register button pressed')}>
                        <Text style={styles.textStyle1}>REGISTER</Text>
                    </TouchableOpacity> */}
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
    registerButton: {
        backgroundColor: "#FFB800",
        borderColor: "#FFB800"
    },
    registerText: {
        color: '#ffffff'
    }
});

export default Login;
