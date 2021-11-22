import React from 'react'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Header } from './../components/Header'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

    const auth = getAuth();
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("LoggedOut");
            })
            .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Profile'} />
            <View styles={styles.buttonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    logoutButton: {
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
})

export default Profile
