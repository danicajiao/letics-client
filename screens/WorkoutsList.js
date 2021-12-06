import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    Platform,
    StatusBar,
    ActivityIndicator,
    SectionList,
    Modal,
    Image,
} from 'react-native';
import { Formik } from 'formik';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { AlphabetList } from "react-native-section-alphabet-list";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import axios from 'axios';


const WorkoutsList = ({ values, setFieldValue, pushNewExercise, modalOpen, setModalOpen, navigation }) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [exercises, setExercises] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            // console.log("Focused History")
            const unsubscribe = handleGetExercises({ searchQuery: '' });
            // console.log(getCurrentDate())
            return unsubscribe;
        }, [])
    );

    // const [infoModal, setInfoModalOpen] = useState(false);
    // console.log(modalOpen);

    const handleGetExercises = (values) => {
        const baseUrl = Constants.manifest.extra.testUrl;
        // console.log("IN handleGetExercises:")
        // console.log(values.searchQuery);
        console.log(baseUrl + 'exercises/' + values.searchQuery);
        axios.get(baseUrl + 'exercises/' + values.searchQuery)
            .then((response) => {
                const exercisesArray = response.data;
                let myArray = [];
                console.log(exercisesArray);
                for (let i = 0; i < exercisesArray.length; i++) {
                    let obj = {
                        key: exercisesArray[i]._id,
                        value: exercisesArray[i].exercise_name,
                        type: exercisesArray[i].exercise_type
                    }
                    myArray.push(obj);
                }
                setExercises(myArray);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // If type is null, we assume the request failed
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const CustomItem = ({ item, pushNewExercise, modalOpen, setModalOpen }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} onPress={() => {
                if (modalOpen) {
                    setFieldValue('exercises', [...values.exercises, pushNewExercise(item.value)])
                    setModalOpen(false)
                } else {
                    navigation.push("ExerciseDetails", { exercise: item })
                }
                // console.log(values)
            }}>
                <View style={styles.cardImg}></View>
                <View style={styles.listItemTextContainer}>
                    <Text style={styles.workoutName}>{item.value}</Text>
                    <Text style={styles.workoutType}>{item.type}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSectionHeader = (section) => {
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']} >
            <StatusBar barStyle={'dark-content'} />
            <Header title={'Workouts'} />
            <Formik
                initialValues={{ searchQuery: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Submitted to server:');
                    console.log(values);
                    handleGetExercises(values)

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue }) => (
                    <View style={styles.forms}>
                        <MyTextInput
                            label='Search'
                            icon='search'
                            placeholder='Bench Press'
                            placeholderTextColor={Colors.darkLight}
                            // onChangeText={e => { setFieldValue('searchQuery', e ? e : ); handleSubmit() }}
                            onChangeText={e => { setFieldValue('searchQuery', e); handleSubmit() }}
                            onBlur={handleBlur('searchQuery')}
                            value={values.searchQuery}
                            keyboardType='default'
                        // onSubmitEditing={() => { handleSubmit(); }}
                        />
                        <Text type={messageType} style={styles.message}>{message}</Text>
                    </View>
                )}
            </Formik >
            <AlphabetList
                style={{ flex: 1 }}
                data={exercises}
                indexLetterStyle={{
                    color: 'black',
                    fontSize: 12,
                }}
                renderCustomItem={(item) => <CustomItem item={item} pushNewExercise={pushNewExercise} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
                renderCustomSectionHeader={renderSectionHeader}
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
        backgroundColor: 'lightgray',
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
    },

});

export default WorkoutsList;
