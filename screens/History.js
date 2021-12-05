import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Alert, View, Text, TouchableOpacity, StatusBar, ActivityIndicator, Modal, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars';
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';
import axios from 'axios';
import ViewWorkout from './ViewWorkout';

// console.log("HISTORY LOG OUTSIDE");


const History = () => {
    // const initialItems = {};
    const [workoutsArray, setWorkoutsArray] = useState([]);
    const [calendarItems, setCalendarItems] = useState({});
    const [doneLoading, setLoadingState] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const auth = getAuth();

    // let workoutsArray = [];
    // console.log("HISTORY LOG INSIDE");

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            console.log("Focused History")
            handleGetWorkouts();
            // console.log(getCurrentDate())
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    useEffect(() => {
        constructCalendarItems();
        return () => {
            // Do something when the component is mounted
            // Useful for cleanup functions
        }
    }, [workoutsArray])

    const getCurrentDate = () => {
        const currentDate = new Date()
        return currentDate.toISOString().split('T')[0];
    }

    // console.log("History screen focused.");

    const handleGetWorkouts = () => {
        const baseUrl = Constants.manifest.extra.testUrl;
        const uid = auth.currentUser.uid;

        axios.get(baseUrl + 'users/' + uid + '/workouts')
            .then((response) => {
                // console.log("BEFORE OPERATIONS:")
                // console.log(items);
                // const itemCopy = { ...items };
                // const itemsTemp = {}
                // setCalendarItems(itemsTemp);

                setWorkoutsArray(response.data);
                // workoutsArray = response.data;

                // console.log(workoutsArray);
                // const { status, message, data, mongdb } = result;

                // console.log("Recieved from server:");
                // console.log(workoutsArray);

                // for (let i = 0; i < workoutsArray.length; i++) {
                //     // console.log(workoutsArray[i]);
                //     if (!itemsTemp[workoutsArray[i].date]) {
                //         itemsTemp[workoutsArray[i].date] = [];
                //         itemsTemp[workoutsArray[i].date].push({
                //             workoutId: workoutsArray[i]._id,
                //             workoutIndex: i,
                //             exercises: workoutsArray[i].exercises,
                //             name: 'Item for ' + workoutsArray[i].date + ' #' + i,
                //             // height: Math.max(50, Math.floor(Math.random() * 150))
                //         });
                //     } else {
                //         itemsTemp[workoutsArray[i].date].push({
                //             workoutId: workoutsArray[i]._id,
                //             workoutIndex: i,
                //             exercises: workoutsArray[i].exercises,
                //             name: 'Item for ' + workoutsArray[i].date + ' #' + i,
                //             // height: Math.max(50, Math.floor(Math.random() * 150))
                //         });
                //     }
                // }

                // // console.log("AFTER OPERATIONS:")
                // // console.log(items);
                // const newItems = {};
                // // console.log(newItems)
                // Object.keys(itemsTemp).forEach(key => {
                //     newItems[key] = itemsTemp[key];
                // });

                // // console.log(newItems)
                // setCalendarItems(newItems);
                // setLoadingState(true);
            })
            .catch((error) => {
                console.log("Failed to get from server. Verify the request and path to the server.");
                console.log(error);
            });
    }

    const handleDeleteWorkout = (workoutId) => {
        const baseUrl = Constants.manifest.extra.testUrl;
        const uid = auth.currentUser.uid;

        axios.delete(baseUrl + 'users/' + uid + '/workouts/' + workoutId + '/delete')
            .then((response) => {
                // console.log("BEFORE OPERATIONS:")
                // console.log(items);
                // const itemCopy = { ...items };
                console.log(response.data);
                setModalVisible(false)
                handleGetWorkouts();
            })
            .catch((error) => {
                console.log("Failed to get from server. Verify the request and path to the server.");
                console.log(error);
            });
    }

    const handleUpdateWorkout = (workoutId, updatedWorkout, setSubmitting) => {
        const baseUrl = Constants.manifest.extra.testUrl;
        const uid = auth.currentUser.uid;

        axios.put(baseUrl + 'users/' + uid + '/workouts/' + workoutId + '/update', updatedWorkout)
            .then((response) => {
                // console.log("BEFORE OPERATIONS:")
                // console.log(items);
                // const itemCopy = { ...items };
                console.log(response.data);
                setSubmitting(false)
                // setModalVisible(false)
                handleGetWorkouts();

            })
            .catch((error) => {
                console.log("Failed to get from server. Verify the request and path to the server.");
                console.log(error);
                setSubmitting(false)
            });
    }

    const constructCalendarItems = () => {

        const itemsTemp = {}
        setCalendarItems(itemsTemp);

        for (let i = 0; i < workoutsArray.length; i++) {
            // console.log(workoutsArray[i]);
            if (!itemsTemp[workoutsArray[i].date]) {
                itemsTemp[workoutsArray[i].date] = [];
                itemsTemp[workoutsArray[i].date].push({
                    workoutId: workoutsArray[i]._id,
                    workoutIndex: i,
                    exercises: workoutsArray[i].exercises,
                    name: 'Item for ' + workoutsArray[i].date + ' #' + i,
                    // height: Math.max(50, Math.floor(Math.random() * 150))
                });
            } else {
                itemsTemp[workoutsArray[i].date].push({
                    workoutId: workoutsArray[i]._id,
                    workoutIndex: i,
                    exercises: workoutsArray[i].exercises,
                    name: 'Item for ' + workoutsArray[i].date + ' #' + i,
                    // height: Math.max(50, Math.floor(Math.random() * 150))
                });
            }
        }

        // console.log("AFTER OPERATIONS:")
        // console.log(items);
        const newItems = {};
        // console.log(newItems)
        Object.keys(itemsTemp).forEach(key => {
            newItems[key] = itemsTemp[key];
        });

        // console.log(newItems)
        setCalendarItems(newItems);
    }

    const renderItem = (item) => {
        const list = item.exercises.map((exercise, index) => {
            const getMaxForWorkout = () => {
                let max = exercise.sets[0].weight;
                exercise.sets.forEach(set => {
                    if (set.weight > max) {
                        max = set.weight;
                    }
                })
                return max;
            }
            return (
                <Text key={index}>{exercise.name}: {getMaxForWorkout()} lb max!</Text>
            );
        });

        return (
            <TouchableOpacity
                // testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => {
                    // console.log(selectedWorkout);
                    setSelectedWorkout(item.workoutIndex);
                    // console.log(selectedWorkout);
                    setModalVisible(!modalVisible);
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>Workout</Text>
                {list}
            </TouchableOpacity>
        );
    }

    const RenderModal = () => {
        if (workoutsArray.length !== 0) {
            return (
                < SafeAreaView style={styles.centeredView} >

                    <View style={styles.modalView}>
                        <ViewWorkout
                            workoutData={workoutsArray[selectedWorkout]}
                            setModalVisible={setModalVisible}
                            handleDeleteWorkout={handleDeleteWorkout}
                            handleUpdateWorkout={handleUpdateWorkout}
                        />
                        {/* <Text style={styles.modalText}>{workoutsArray[selectedWorkout]._id}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
                    </View>
                </SafeAreaView >
            );
        }
        else {
            return null;
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
            <StatusBar barStyle={'dark-content'} />


            < Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // setModalVisible(!modalVisible);
                }}
            >
                <RenderModal />
            </Modal>

            {/* {!doneLoading &&
                <ActivityIndicator size={'large'} />
            } */}
            {/* {doneLoading && */}
            <Agenda
                items={calendarItems}
                renderItem={renderItem}
                // loadItemsForMonth={loadItems}
                selected={'2021-12-02'}
                // selected={currentDate}
                showClosingKnob={true}
                theme={{
                    selectedDayBackgroundColor: 'orange',
                }}
            />
            {/* } */}

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    knob: {
        backgroundColor: 'lightgray',
        width: 100,
        height: 100,
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    delete: {
        backgroundColor: 'red',
        padding: 10,
    },
    edit: {
        backgroundColor: 'gray',
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignSelf: 'center',
        // marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        // width: '90%',
    },
    modalView: {
        backgroundColor: 'green',
        alignSelf: 'center',
        width: '90%',
        height: '50%',
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default History;
