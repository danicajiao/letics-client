import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { KeyboardAvoidingWrapper } from '../components/KeyboardAvoidingWrapper';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const axios = require('axios').default;

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const auth = getAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home");
            }
        })
        return unsubscribe;
    }, []);


    const handleLogin = (credentials, setSubmitting) => {
        // const localurl = 'http://localhost:3000/';
        const testurl = 'http://192.168.1.105:3000/';
        const remoteurl = 'https://letics.herokuapp.com/';

        handleMessage(null);

        // // Ensure that this points to the correct url when in testing or production
        // axios.post(testurl + 'record/login', credentials)
        //     .then((response) => {
        //         const result = response.data;
        //         const { status, message, data, mongdb } = result;

        //         console.log("Recieved from server:");
        //         console.log(result);

        //         if (status !== 'SUCCESS') {
        //             handleMessage(message, status);
        //         } else {
        //             // TODO: Navigate to dashboard
        //         }
        //         setSubmitting(false);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setSubmitting(false);
        //         handleMessage("An error occured. Check your network and try again.");
        //     });
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Recieved from Firebase:");
                console.log(user);
                // if (status !== 'SUCCESS') {
                //     handleMessage(message, status);
                // } else {
                //     // TODO: Navigate to dashboard
                // }
                setSubmitting(false);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                setSubmitting(false);
                // handleMessage("An error occured. Check your network and try again.");
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
            <View style={styles.container}>
                <StatusBar style="dark" />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name={'arrow-left'} size={40} style={styles.backIcon} />
                </TouchableOpacity>
                <Header title={'Log In'} />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('Submitted to server:');
                        console.log(values);

                        // Input checks
                        if (values.email == '' || values.password == '') {
                            handleMessage("Please fill in the fields");
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
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
                            {!isSubmitting && (
                                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>LOG IN</Text>
                                </TouchableOpacity>
                            )}
                            {isSubmitting && (
                                <TouchableOpacity disabled={true} style={styles.loginButton}>
                                    <ActivityIndicator size='small' color='white' />
                                </TouchableOpacity>
                            )}
                            <Text type={messageType} style={styles.message}>{message}</Text>
                        </View>
                    )}
                </Formik >
            </View >
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
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: Colors.tertiary
    },
    loginButton: {
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
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        color: (props => props.type == 'SUCCESS' ? 'green' : 'red')
    }
});

export default Login;

