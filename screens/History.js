import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Alert, View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars';
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';
import axios from 'axios';

// console.log("HISTORY LOG OUTSIDE");


const History = () => {
    // const initialItems = {};
    const [calendarItems, setCalendarItems] = useState({});
    const [doneLoading, setLoadingState] = useState(false);
    const auth = getAuth();
    let workoutsArray = [];
    // console.log("HISTORY LOG INSIDE");

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            handleGetWorkouts();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    // console.log("History screen focused.");

    const handleGetWorkouts = () => {
        const baseUrl = Constants.manifest.extra.testUrl;
        const uid = auth.currentUser.uid;

        axios.get(baseUrl + 'users/' + uid + '/workouts')
            .then((response) => {
                // console.log("BEFORE OPERATIONS:")
                // console.log(items);
                // const itemCopy = { ...items };
                const itemsTemp = {}
                setCalendarItems(itemsTemp);

                workoutsArray = response.data;
                // console.log(workoutsArray);
                // const { status, message, data, mongdb } = result;

                // console.log("Recieved from server:");
                // console.log(workoutsArray);

                for (let i = 0; i < workoutsArray.length; i++) {
                    // console.log(workoutsArray[i]);
                    if (!itemsTemp[workoutsArray[i].date]) {
                        itemsTemp[workoutsArray[i].date] = [];
                        itemsTemp[workoutsArray[i].date].push({
                            workout_id: workoutsArray[i]._id,
                            num_exercises: workoutsArray[i].exercises.length,
                            name: 'Item for ' + workoutsArray[i].date + ' #' + i,
                            // height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    } else {
                        itemsTemp[workoutsArray[i].date].push({
                            workout_id: workoutsArray[i]._id,
                            num_exercises: workoutsArray[i].exercises.length,
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
                setLoadingState(true);
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
                handleGetWorkouts();

            })
            .catch((error) => {
                console.log("Failed to get from server. Verify the request and path to the server.");
                console.log(error);
            });
    }

    // const timeToString = (time) => {
    //     const date = new Date(time);
    //     return date.toISOString().split('T')[0];
    // }
    // const loadItems = (day) => {
    //     setTimeout(() => {
    //         for (let i = -1; i < 10; i++) {
    //             // console.log(day)
    //             const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //             // console.log(time)

    //             const strTime = timeToString(time);
    //             console.log(strTime)
    //             if (!items[strTime]) {
    //                 items[strTime] = [];
    //                 const numItems = Math.floor(Math.random() * 3 + 1);
    //                 for (let j = 0; j < numItems; j++) {
    //                     items[strTime].push({
    //                         name: 'Item for ' + strTime + ' #' + j,
    //                         height: Math.max(50, Math.floor(Math.random() * 150))
    //                     });
    //                 }
    //             }
    //         }
    //         const newItems = {};
    //         Object.keys(items).forEach(key => {
    //             newItems[key] = items[key];
    //         });
    //         setItems(newItems);
    //     }, 1000);
    // }

    const renderItem = (item) => {
        return (
            <View
                // testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.edit} onPress={() => Alert.alert(item.workout_id)}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={() => handleDeleteWorkout(item.workout_id)}>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const getCurrentDate = () => {
        const currentDate = new Date()
        return currentDate.toISOString().split('T')[0];
    }


    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
            <StatusBar barStyle={'dark-content'} />
            {!doneLoading &&
                <ActivityIndicator size={'large'} />

            }
            {doneLoading &&
                <Agenda
                    items={calendarItems}
                    renderItem={renderItem}
                    // loadItemsForMonth={loadItems}
                    current={getCurrentDate}
                    // selected={currentDate}
                    showClosingKnob={true}
                    theme={{
                        selectedDayBackgroundColor: 'orange',
                    }}
                />
            }
        </SafeAreaView>
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
    }
});

export default History;
