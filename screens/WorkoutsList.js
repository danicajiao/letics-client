import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, StatusBar, ActivityIndicator, SectionList } from 'react-native';
import { Formik } from 'formik';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { AlphabetList } from "react-native-section-alphabet-list";
import { SafeAreaView } from 'react-native-safe-area-context';


const axios = require('axios').default;

const WorkoutsList = ({ pushNewExercise, setModalOpen }) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    // If type is null, we assume the request failed
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type)
    }

    const data = [
        { value: 'Bench Press', type: 'Chest', key: 'lCUTs2' },
        { value: 'Squat', type: 'Legs', key: 'TXdL0c' },
        { value: 'Crunch', type: 'Core', key: 'zqsiEw' },
        { value: 'Deadlift', type: 'Legs', key: 'psg2PM' },
        { value: 'Wide Pull Up', type: 'Back', key: '1K6I18' },
        { value: 'Arnold Press', type: 'Shoulders', key: 'NVHSkA' },
        { value: 'Incline Chest Fly', type: 'Chest', key: 'SaHqyG' },
        { value: 'Lunge', type: 'Legs', key: 'iaT1Ex' },
        { value: 'Chest Dip', type: 'Chest', key: 'OvMd5e' },
        { value: 'Decline Bench Press', type: 'Chest', key: '25zqAO' },
        { value: 'Hanging Knee Raise', type: 'Core', key: '8cWuu3' },
    ]

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle={'dark-content'} />
            <Header title={'Workouts'} />
            <Formik
                initialValues={{ searchQuery: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Submitted to server:');
                    console.log(values);

                    // Input checks
                    if (values.username == '' || values.email == '' || values.password == '') {
                        handleMessage("Please fill in the fields");
                        setSubmitting(false);
                    } else {
                        handleRegister(values, setSubmitting);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                    <View style={styles.forms}>
                        <MyTextInput
                            label='Search'
                            icon='search'
                            placeholder='Bench Press'
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('searchQuery')}
                            onBlur={handleBlur('searchQuery')}
                            value={values.searchQuery}
                            keyboardType='default'
                        />
                        <Text type={messageType} style={styles.message}>{message}</Text>
                    </View>
                )}
            </Formik >
            <AlphabetList
                style={{ flex: 1 }}
                data={data}
                indexLetterStyle={{
                    color: 'black',
                    fontSize: 12,
                }}
                renderCustomItem={(item) => (
                    <TouchableOpacity style={styles.listItemContainer} onPress={() => { pushNewExercise(item.value); setModalOpen(false) }}>
                        <View style={styles.cardImg}></View>
                        <View style={styles.listItemTextContainer}>
                            <Text style={styles.workoutName}>{item.value}</Text>
                            <Text style={styles.workoutType}>{item.type}</Text>
                        </View>
                    </TouchableOpacity>
                )
                }
                renderCustomSectionHeader={(section) => (
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                    </View>
                )}
            />
        </SafeAreaView >
    );
};

const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View style={styles.formArea}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={20} color={Colors.darkLight} />
            </View>
            <TextInput autoCapitalize="none" style={styles.textInput} {...props} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeaderContainer: {
        paddingHorizontal: '5%'
    },
    sectionHeaderLabel: {
        fontWeight: 'bold'
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'white',
        backgroundColor: Colors.secondary,
    },
    cardImg: {
        backgroundColor: 'gray',
        borderRadius: 100,
        height: 40,
        width: 40
    },
    listItemTextContainer: {
        paddingHorizontal: '5%'
    },
    workoutName: {
        fontWeight: 'bold'
    },
    forms: {
        paddingTop: 20,
        alignItems: 'center'
    },
    formArea: {
        width: "90%"
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

export default WorkoutsList;
