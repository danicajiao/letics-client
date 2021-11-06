import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import TaskBar from './../components/TaskBar'; // custom bottom navigation bar
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { CustomButton } from './../components/CustomButton';
import { SubHeader } from '../components/SubHeader';

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <Header title={'Dashboard'} />
            <View style={styles.contain}>
                <SubHeader title={'RECENT WORKOUT'} />
            </View>
            <TaskBar></TaskBar>
        </View >
    );
};

const StatusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBarHeight + 10
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    backIcon: {
        paddingLeft: 20,
        paddingTop: 20
    },
    forms: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    formArea: {
        width: "90%",
    },
    leftIcon: {
        left: 15,
        top: 35,
        position: 'absolute',
        zIndex: 1,
        elevation: (Platform.OS === 'android') ? 50 : 0
    },
    inputLabel: {
        color: Colors.tertiary,
        fontSize: 13,
        textAlign: 'left'
    },
    textInput: {
        backgroundColor: Colors.secondary,
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: Colors.tertiary,
    },
    button: {
        backgroundColor: '#000000',
        width: '90%',
    },
    buttonText: {
        color: '#ffffff'
    }
});

export default Dashboard;