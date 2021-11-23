import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { KeyboardAvoidingWrapper } from '../components/KeyboardAvoidingWrapper';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const axios = require('axios').default;

const Forgot = () => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const auth = getAuth();
    const navigation = useNavigation();

    const handleForgotPassword = (email, setSubmitting) => {
        handleMessage(null);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password Reset email sent.");
                setSubmitting(false);
                navigation.goBack();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSubmitting(false);
                handleMessage(errorMessage);

            });
    }


    // If type is null, we assume the request failed
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type)
    }

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'dark-content'} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name={'arrow-left'} size={40} style={styles.backIcon} />
                </TouchableOpacity>
                <Header title={'Forgot Password'} />
                <Text style={styles.textContainer}>
                    <Text>
                        Enter the email address you use with us and we'll send you a link to reset your password.{'\n\n'}
                        If you dont see it, there is a chance it might be in your "Spam" or "Bulk Email" folder.
                    </Text>
                </Text>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('Submitted to server:');
                        console.log(values);

                        // Input checks
                        if (values.email == '') {
                            handleMessage("Please fill in the field");
                            setSubmitting(false);
                        } else {
                            handleForgotPassword(values.email, setSubmitting);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                            {!isSubmitting && (
                                <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>SEND EMAIL</Text>
                                </TouchableOpacity>
                            )}
                            {isSubmitting && (
                                <TouchableOpacity disabled={true} style={styles.sendButton}>
                                    <ActivityIndicator size='small' color='white' />
                                </TouchableOpacity>
                            )}
                            <Text type={messageType} style={styles.message}>{message}</Text>
                        </View>
                    )}
                </Formik >
            </SafeAreaView >
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View style={styles.formArea}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={20} color={Colors.darkLight} />
            </View>
            <TextInput autoCapitalize="none" autoCorrect={false} style={styles.textInput} {...props} />
            {isPassword && (
                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                    <Octicons name={hidePassword ? 'eye-closed' : 'eye'} size={20} color={Colors.darkLight} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    textContainer: {
        paddingVertical: '10%',
        paddingHorizontal: '5%'
    },
    backIcon: {
        paddingLeft: 20,
        paddingTop: 20
    },
    forms: {
        flex: 1,
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
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: Colors.tertiary
    },
    sendButton: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
        backgroundColor: '#000000',
        width: '90%',
        marginBottom: '5%'
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    forgotText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'blue',
        marginBottom: '5%'
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        color: (props => props.type == 'SUCCESS' ? 'green' : 'red'),
    }
});

export default Forgot;
