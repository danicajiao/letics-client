import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { Header } from './../components/Header'
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants'
import axios from 'axios';

const Profile = () => {

    const auth = getAuth();
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("LoggedOut");
            })
            .catch(error => alert(error.message))
    }

    const deactivateDialog = () =>
        Alert.alert(
            "Confirm Operation",
            "Are you sure you want to deactivate your account? This cannot be undone.",
            [
                { text: "Cancel" },
                {
                    text: "Yes",
                    onPress: () => {
                        navigation.navigate("Reauthenticate");
                    },
                }
            ]
        );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Header title={'Profile'} />
            <View style={styles.testContainer}>
                {/* <Image style={styles.profileImg}  source={}/> */}
                <View style={styles.profileImg}>
                    <Ionicons name={'person'} size={80} color={'gray'} />
                </View>
                <View style={styles.currentUserText}>
                    <Text>Currently logged in as:</Text>
                    <Text style={{ fontWeight: 'bold' }}>{auth.currentUser.email}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>LOG OUT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deactivateButton} onPress={deactivateDialog}>
                    <Text style={styles.deactivateText}>DEACTIVATE ACCOUNT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    testContainer: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        // backgroundColor: '#EEE'
    },
    profileImg: {
        width: 100,
        height: 100,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5%'
    },
    currentUserText: {
        marginVertical: '5%',
        alignItems: 'center'
    },
    logoutButton: {
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
        backgroundColor: '#000000',
        marginVertical: '2%'
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    deactivateButton: {
        backgroundColor: 'red',
        alignItems: "center",
        // borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 5,
        marginVertical: '5%'
    },
    deactivateText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
})

export default Profile
