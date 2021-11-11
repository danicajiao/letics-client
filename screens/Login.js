import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';

import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { CustomButton } from './../components/CustomButton';

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <View style={styles.container}>
            <Header title={'Log In'} />
            <TouchableOpacity onPress={() => Alert.alert('Back button pressed')}>
                <Octicons name={'arrow-left'} size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.forms}>
                        <MyTextInput
                            label='Email Address'
                            icon='mail'
                            placeholder='andyj@gmail.com'
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <MyTextInput
                            label='Password'
                            icon='lock'
                            placeholder='**********'
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                )
                }
            </Formik >
        </View >
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View style={styles.formArea}>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={20} color={Colors.darkLight} />
            </View>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput style={styles.textInput} {...props} />
            {isPassword && (
                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                    <Octicons name={hidePassword ? 'eye-closed' : 'eye'} size={20} color={Colors.darkLight} />
                </TouchableOpacity>
            )}
        </View>
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
    rightIcon: {
        right: 15,
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
    registerButton: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
        backgroundColor: '#000000',
        width: '90%',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
});

export default Login;
