import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { KeyboardAvoidingWrapper } from '../components/KeyboardAvoidingWrapper';
import app from '../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< HEAD
import * as yup from 'yup'
import axios from 'axios'; // for http request processing
=======
import * as yup from 'yup';
import axios from 'axios';
>>>>>>> 0a7af18e4b270d2ceff3006cd714efec96131632

// const axios = require('axios').default;

const Register = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const auth = getAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Verify");
            }
        })
        return unsubscribe;
    }, []);

    const handleRegister = (credentials, setSubmitting) => {
<<<<<<< HEAD
        const localurl = 'http://localhost:3000/';
        const testurl = 'http://10.115.194.36:3000/';
        const remoteurl = 'https://letics.herokuapp.com/';
=======
        const localURL = Constants.manifest.extra.localURL;
        const testURL = Constants.manifest.extra.testURL;
        const remoteURL = Constants.manifest.extra.remoteURL;
        console.log(remoteURL);
>>>>>>> 0a7af18e4b270d2ceff3006cd714efec96131632

        handleMessage(null);

        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("UID recieved from Firebase:");
                console.log(user.uid);
                const userObject = {
                    firebase_uid: user.uid,
                    workouts: []
                }
                console.log("Submitted to server:");
                console.log(userObject);


                // Ensure that this points to the correct url when in testing or production
<<<<<<< HEAD
                axios.post(testurl + 'record/add', userObject)
=======
                axios.post(remoteURL + 'users/init', userObject)
>>>>>>> 0a7af18e4b270d2ceff3006cd714efec96131632
                    .then((response) => {
                        const result = response.data;
                        const { status, message, data, mongdb } = result;

                        console.log("Recieved from server:");
                        console.log(result);

                        if (status !== 'SUCCESS') {
                            handleMessage(message, status);
                        } else {
                            // TODO: Navigate to tabs
                        }
                        setSubmitting(false);
                    })
                    .catch((error) => {
                        console.log("Failed submitting UID to server. Verify the POST requests and paths to the server.");
                        console.log(error);
                        setSubmitting(false);
                        handleMessage("An error occured. Check your network and try again.");
                    });
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

    const registerSchema = yup.object().shape({
        username: yup.string()
            .matches(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                "Invalid username:\n" +
                "1. Must contain 8 to 20 characters\n" +
                "2. Only contains letters, _ and .\n" +
                "3. Cannot start or end with _ or .\n" +
                "4. _ and . can't be next to each other")
            .required('Enter a username'),
        email: yup.string()
            .email('Enter a valid email')
            .required('Enter an email'),
        password: yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                "Invalid password:\n" +
                "1. Must contain 6 characters\n" +
                "2. One uppercase letter\n" +
                "3. One lowercase letter\n" +
                "4. One number\n5. One special character")
            .required('Enter a password')
    });

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'dark-content'} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name={'arrow-left'} size={40} style={styles.backIcon} />
                </TouchableOpacity>
                <Header title={'Register'} />
                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log('Submitted to Firebase:');
                        console.log(values);
                        handleRegister(values, setSubmitting);
                    }}
                    validationSchema={registerSchema}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
                        <View style={styles.forms}>
                            <MyTextInput
                                label='Username'
                                icon='mention'
                                placeholder='andyj'
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                keyboardType='default'
                                wasTouched={touched.username}
                                error={errors.username}
                            />
                            {errors.username && touched.username && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.message}>{errors.username}</Text>
                                </View>
                            )}
                            <MyTextInput
                                label='Email Address'
                                icon='mail'
                                placeholder='andyj@gmail.com'
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                wasTouched={touched.email}
                                error={errors.email}
                            />
                            {errors.email && touched.email && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.message}>{errors.email}</Text>
                                </View>
                            )}
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
                                wasTouched={touched.password}
                                error={errors.password}
                            />
                            {errors.password && touched.password && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.message}>{errors.password}</Text>
                                </View>
                            )}
                            {!isSubmitting && (
                                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>SIGN UP</Text>
                                </TouchableOpacity>
                            )}
                            {isSubmitting && (
                                <TouchableOpacity disabled={true} style={styles.registerButton}>
                                    <ActivityIndicator size='small' color='white' />
                                </TouchableOpacity>
                            )}
                            {message && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.message}>{message}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </Formik >
            </SafeAreaView >
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, wasTouched, error, ...props }) => {
    const labelStyleOnError = () => {
        if (wasTouched && error) {
            return { color: 'red' }
        } else {
            return { color: 'black' }
        }
    };

    const borderStyleOnError = () => {
        if (wasTouched && error) {
            return { borderColor: 'red' }
        } else {
            return { borderColor: 'black' }
        }
    }

    return (
        <View style={styles.formArea}>
            <Text style={[styles.inputLabel, labelStyleOnError()]}>{label}</Text>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={20} color={Colors.darkLight} />
            </View>
            <TextInput autoCapitalize="none" autoCorrect={false} style={[styles.textInput, borderStyleOnError()]} {...props} />
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
    registerButton: {
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
    errorContainer: {
        backgroundColor: 'rgb(245, 216, 218)',
        width: '90%',
        borderRadius: 5,
        marginBottom: '2%'
    },
    message: {
        textAlign: 'center',
        fontSize: 13,
        paddingVertical: '2%',
        color: 'rgb(105, 35, 38)'
    }
});

export default Register;

