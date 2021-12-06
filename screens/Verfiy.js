import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { getAuth, sendEmailVerification } from '@firebase/auth';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header'

const Verfiy = () => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const navigation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
        sendEmail();
    }, []);

    const sendEmail = () => {
        const unsubsribe = sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Email sent.")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                handleMessage(errorMessage)
            })
        return unsubsribe;
    }

    const checkIfVerified = () => {
        auth.currentUser.reload()
            .then(() => {
                if (auth.currentUser.emailVerified) {
                    navigation.navigate("Home")
                } else {
                    handleMessage("Please verify your email");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    // If type is null, we assume the request failed
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name={'arrow-left'} size={40} style={styles.backIcon} />
            </TouchableOpacity>
            <Header title={'Verify your Email'} />
            <View style={styles.content}>
                <Text style={styles.textContainer}>
                    <Text>We have sent an email to </Text>
                    <Text style={{ fontWeight: 'bold' }}>{auth.currentUser.email}{'\n\n\n'}</Text>
                    <Text>
                        You need to verify your email to continue.{'\n\n'}
                        If you have not recieved the verification email, please check your "Spam" or "Bulk Email" folder.
                        You can also click the resend button below to have another email sent to you.
                    </Text>
                </Text>
                <TouchableOpacity style={styles.button} onPress={sendEmail}>
                    <Text style={styles.buttonText}>RESEND EMAIL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]} onPress={checkIfVerified}>
                    <Text style={[styles.buttonText, { color: '#FFF' }]}>CHECK AND CONTINUE</Text>
                </TouchableOpacity>
                <Text type={messageType} style={styles.message}>{message}</Text>
            </View>
        </SafeAreaView >
    )
}

export default Verfiy

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: '5%'
    },
    backIcon: {
        paddingLeft: 20,
        paddingTop: 20
    },
    textContainer: {
        paddingVertical: '10%',
    },
    button: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
        width: '100%',
        marginBottom: '5%'
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold'
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        color: (props => props.type == 'SUCCESS' ? 'green' : 'red')
    }
})
