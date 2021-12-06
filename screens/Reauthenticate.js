import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { KeyboardAvoidingWrapper } from '../components/KeyboardAvoidingWrapper';
import { getAuth, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as yup from 'yup'


const Reauthenticate = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const auth = getAuth();
    const navigation = useNavigation();

    const handleDeactivate = () => {
        const baseUrl = Constants.manifest.extra.testUrl;
        const user = auth.currentUser;

        deleteUser(user)
            .then(() => {
                axios.delete(baseUrl + 'users/' + user.uid + '/deactivate')
                    .then((response) => {
                        console.log(response.data);
                        navigation.navigate("LoggedOut");
                    })
                    .catch((error) => {
                        console.log("Request to server failed.");
                        console.log(error);
                    });
            })
            .catch(error => alert(error.message))
    }

    const handleReauthenticate = (credentials, setSubmitting) => {

        handleMessage(null);

        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                // console.log("UID recieved from Firebase:");
                // console.log(user.uid);
                handleDeactivate()
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

    const authSchema = yup.object().shape({
        email: yup.string()
            .email('Enter a valid email')
            .required('Enter an email'),
        password: yup.string()
            .required('Enter a password')
    });

    return (
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'dark-content'} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name={'arrow-left'} size={40} style={styles.backIcon} />
                </TouchableOpacity>
                <Header title={'Authentication'} />
                <Formik
                    initialValues={{ email: auth.currentUser.email, password: '' }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        handleReauthenticate(values, setSubmitting)
                    }}
                    validationSchema={authSchema}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
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
                                wasTouched={touched.email}
                                error={errors.email}
                                editable={false}
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
                                <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                                    <Text style={styles.confirmText}>CONFIRM</Text>
                                </TouchableOpacity>
                            )}
                            {isSubmitting && (
                                <TouchableOpacity disabled={true} style={styles.confirmButton}>
                                    <ActivityIndicator size='small' color='white' />
                                </TouchableOpacity>
                            )}
                            <Text type={messageType} style={styles.message}>{message}</Text>
                        </View>
                    )}
                </Formik >
                <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
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
    confirmButton: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
        backgroundColor: '#000000',
        width: '90%',
        marginBottom: '5%'
    },
    confirmText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    forgotText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'blue',
        marginBottom: '5%'
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

export default Reauthenticate;

