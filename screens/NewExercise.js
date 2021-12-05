import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Modal, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import WorkoutsList from './WorkoutsList';
import { Header } from './../components/Header';
import ExerciseCard from './../components/ExerciseCard'
import { getAuth } from "firebase/auth";
import * as yup from 'yup'
import Constants from 'expo-constants';
import axios from 'axios';

const NewExercise = ({ navigation }) => {
    const auth = getAuth();
    const [count, setCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const deleteDialog = (navigation, handleReset) =>
        Alert.alert(
            "Confirm Operation",
            "Are you sure you want to delete this workout?",
            [
                { text: "Cancel" },
                {
                    text: "Yes",
                    onPress: () => {
                        handleReset();
                        navigation.goBack()
                    },
                }
            ]
        );

    const initialValues = {
        date: undefined,
        exercises: []
    }

    const pushNewExercise = (exerciseName) => ({
        name: exerciseName,
        sets: []
    });

    const exerciseSchema = yup.object().shape({
        exercises: yup.array().of(
            yup.object().shape({
                sets: yup.array().of(
                    yup.object().shape({
                        weight: yup.number()
                            .min(1, "Minimum weight is 1")
                            .required("Enter a weight"),
                        reps: yup.number()
                            .min(1, "Minimum reps is 1")
                            .required("Enter number of reps")
                    })
                ).min(1, "needs at least 1 set.")
            })
        ).min(1, "Needs at least 1 exercise")
    });

    const handleLog = (values, setSubmitting) => {
        const workoutObj = {
            firebase_uid: auth.currentUser.uid,
            ...values
        }

        console.log("Submitted to server:");
        console.log(workoutObj);

        const baseUrl = Constants.manifest.extra.testUrl;
        console.log(baseUrl);

        // Ensure that this points to the correct url when in testing or production
        axios.post(baseUrl + 'users/logWorkout', workoutObj)
            .then((response) => {
                const result = response.data;

                console.log("Recieved from server:");
                console.log(result);

                // if (status !== 'SUCCESS') {
                //     handleMessage(message, status);
                // } else {

                // }

                setSubmitting(false);
            })
            .catch((error) => {
                console.log("Failed to submit to server. Verify the request and path to the server.");
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occured. Check your network and try again.");
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* // here we will add code to reset the data */}

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        values.date = getCurrentDate();
                        console.log('Gathered from logging:');
                        console.log(values);
                        handleLog(values, setSubmitting);
                        resetForm();
                    }}
                    validationSchema={exerciseSchema}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting, setFieldValue, errors, touched }) => (
                        <View>
                            <Modal visible={modalOpen} animationType="slide">
                                <SafeAreaView style={styles.modalContent}>
                                    <TouchableOpacity onPress={() => setModalOpen(false)}>
                                        <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
                                    </TouchableOpacity>
                                    <WorkoutsList
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        pushNewExercise={pushNewExercise}
                                        modalOpen={modalOpen}
                                        setModalOpen={setModalOpen}
                                    />
                                </SafeAreaView>
                            </Modal>

                            <TouchableOpacity onPress={() => { deleteDialog(navigation, handleReset); }}>
                                <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
                            </TouchableOpacity>
                            <Header title={"New Workout"} />

                            {/* {console.log("WorkoutLog Rendered!")} */}

                            <ExerciseList
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />

                            <View style={{ flex: 0.1 }}>
                                <TouchableOpacity style={styles.addBtn} onPress={() => setModalOpen(true)}>
                                    <Text style={styles.addBtnText}>Add Exercise</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={styles.logBtn} onPress={() => { handleSubmit() }}>
                                    <Text style={styles.logBtnText}>LOG</Text>
                                </TouchableOpacity> */}
                                {!isSubmitting && (
                                    <TouchableOpacity style={styles.logBtn} onPress={handleSubmit}>
                                        <Text style={styles.logBtnText}>LOG</Text>
                                    </TouchableOpacity>
                                )}
                                {isSubmitting && (
                                    <TouchableOpacity disabled={true} style={styles.logBtn}>
                                        <ActivityIndicator size='small' color='white' />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* ERROR LIST DEBUGGING */}
                            {/* <View style={styles.errorContainer}>
                                <Text style={styles.message}>{JSON.stringify(errors, null, 2)}</Text>
                            </View> */}
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

const ExerciseList = ({ values, setFieldValue, handleChange, handleBlur, errors, touched }) => {

    const FormError = ({ index, errors, touched }) => {
        if (JSON.stringify(errors) !== '{}' && JSON.stringify(touched) !== '{}') {
            if (errors.exercises[index] && touched.exercises[index]) {
                if (Array.isArray(errors.exercises[index].sets)) {
                    return (
                        < View style={styles.errorContainer}>
                            <Text style={styles.message}>Invalid values</Text>
                        </View>
                    );
                } else {
                    return (
                        < View style={styles.errorContainer}>
                            <Text style={styles.message}>'{values.exercises[index].name}' {errors.exercises[index].sets}</Text>
                        </View>
                    );
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const list = values.exercises.length > 0 ? values.exercises.map((exercise, index) => {
        return (
            // <Text key={exercise}>{exercise.name}</Text>
            <View key={index}>
                <ExerciseCard
                    values={values}
                    exerciseIndex={index}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />

                {/* DEBUG LOGS FOR FORM VALIDATION */}
                {/* {console.log("ERRORS-----------------------")}
                {console.log(JSON.stringify(errors, null, 2))}
                {console.log("TOUCHED-----------------------")}
                {console.log(JSON.stringify(touched, null, 2))}
                {console.log("VALUES-----------------------")}
                {console.log(JSON.stringify(values, null, 2))} */}

                <FormError index={index} errors={errors} touched={touched} />

            </View >

        );
    }) :
        <View style={styles.noExercisesContainer}>
            <Text style={styles.noExercisesMessage}>
                <Text style={{ fontWeight: 'bold' }}>You curently have no exercises{'\n\n'}</Text>
                Add some by pressing 'Add Exercise' below 🔥
            </Text>
        </View>

    // console.log(list)
    return (
        <View style={styles.exerciseList}>{list}</View>
    );
}

const getCurrentDate = () => {
    const currentDate = new Date()
    return currentDate.toISOString().split('T')[0];
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backIcon: {
        paddingLeft: 20,
        paddingTop: 20
    },
    titlecontainer: {
        alignSelf: 'center',
        top: 100,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    // NOTE: THIS FUNCTIONALITY DOES NOT ACCOUNT FOR HAVING LIKE 20 EXERCISES,
    // SO IT DOESNT EXPAND AS IT GETS LARGER AND LARGER
    exerciseList: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        // flexDirection: 'column',
        // backgroundColor: 'red',
        // justifyContent: 'space-evenly',
    },
    exerciseBubble: {
        height: 200,
        width: '100%',
        marginBottom: 10,
        alignSelf: 'center',

    },
    addBtn: {
        marginTop: 30,
        marginBottom: 15,
        borderWidth: 2,
        borderRadius: 6,
        width: '90%',
        height: 35,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    addBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logBtn: {
        marginBottom: 30,
        backgroundColor: '#000',
        borderWidth: 2,
        borderRadius: 6,
        width: '90%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // bottom: 50,
    },
    logBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContent: {
        flex: 1,
    },
    modalList: {
        flex: 0.5,
        top: 25,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    modalExercise: {
        width: '90%',
        backgroundColor: 'grey',
        height: 70,
        borderRadius: 10,
    },
    modalText: {
        top: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '200',
    },
    exerciseText: {
        top: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '200',
    },
    errorContainer: {
        backgroundColor: 'rgb(245, 216, 218)',
        borderRadius: 5,
        marginBottom: '2%',
        width: '90%',
        alignSelf: 'center'
    },
    message: {
        textAlign: 'center',
        fontSize: 13,
        paddingVertical: '2%',
        color: 'rgb(105, 35, 38)'
    },
    noExercisesContainer: {
        backgroundColor: '#F3F3F3',
        paddingVertical: '20%',
        borderRadius: 7
    },
    noExercisesMessage: {
        textAlign: 'center'
    },

})
export default NewExercise;
