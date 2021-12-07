import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { SubHeader } from '../components/SubHeader';
import { BarChart } from 'react-native-chart-kit'
import axios from 'axios'; // for http request processing
import { getAuth } from "firebase/auth";
import { useFocusEffect } from '@react-navigation/native';

//Dashboard will be dynamic due to the linechart 
const Dashboard = () => {
    const [chartParentWidth, setChartParentWidth] = useState(0);
    const [workoutsArray, setWorkoutsArray] = useState([]);
    const [chartData, setChartData] = useState([0, 0, 0]);
    // get authentication info
    const auth = getAuth();

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            // console.log("Focused History")
            const unsubscribe = handleGetWorkouts();
            // console.log(getCurrentDate())
            return unsubscribe;
        }, [])
    );

    useEffect(() => {
        const unsubscribe = constructChartData();
        return unsubscribe;
    }, [workoutsArray])

    let data = {
        labels: ['Squat', 'Bench Press', 'Deadlift'],
        datasets: [
            {
                data: chartData, //max_weight,
                // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 2, // optional
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };

    // beginning of current week
    function beginWeek() {
        // cool calculation to get first day of week (anchor date)
        let date = new Date();
        let day = date.getDay() || 7;
        if (day !== 1)
            date.setHours(-24 * (day - 1));
        return "Current Week is " + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    const handleGetWorkouts = () => {
        const baseUrl = Constants.manifest.extra.testUrl;
        const uid = auth.currentUser.uid;

        axios.get(baseUrl + 'users/' + uid + '/workouts')
            .then((response) => {
                setWorkoutsArray(response.data)
            })
            .catch((error) => {
                console.log("Failed to get from server. Verify the request and path to the server.");
                console.log(error);
            });
    }

    const constructChartData = () => {
        let max_weight = [0, 0, 0]; // squat, bench, deadlift
        let itemsTemp = [];
        let sets = [];

        // console.log(workoutsArray)

        // check for empty array
        if (workoutsArray.length == 0) {
            setChartData(max_weight);
        }

        for (let i = 0; i < workoutsArray.length; i++) {
            // current list of exercises
            itemsTemp = workoutsArray[i].exercises;

            // loop through exercises searching for users current maxes
            for (let j = 0; j < itemsTemp.length; j++) {
                if (itemsTemp[j].name === "Bench Press") {
                    // check for highest weight acheived by user in bench
                    sets = itemsTemp[j].sets;
                    for (let k = 0; k < sets.length; k++) {
                        if (max_weight[1] <= sets[k].weight) {
                            max_weight[1] = sets[k].weight;
                        }
                    }
                }
                else if (itemsTemp[j].name === "Squat") {
                    // check for highest weight acheived by user in squat
                    sets = itemsTemp[j].sets;
                    for (let k = 0; k < sets.length; k++) {
                        if (max_weight[0] <= sets[k].weight) {
                            max_weight[0] = sets[k].weight;
                        }
                    }
                }
                else if (itemsTemp[j].name === "Deadlift") {
                    // check for highest weight acheived by user in deadlift
                    sets = itemsTemp[j].sets;
                    for (let k = 0; k < sets.length; k++) {
                        if (max_weight[2] <= sets[k].weight) {
                            max_weight[2] = sets[k].weight;
                        }
                    }
                }
            }
        }

        setChartData(max_weight);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Header title={'Dashboard'} />
            <SubHeader title={'Welcome Back!'} />
            <SubHeader title={beginWeek()} />

            <View
                onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
                style={styles.chartWrapper}
            >
                <BarChart
                    data={data}
                    width={chartParentWidth} // from react-native
                    height={450}
                    yAxisLabel={''}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 10,//50,
                        // marginHorizontal: 15,
                        borderRadius: 16
                    }}
                />
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginVertical: -14
    },
    chartWrapper: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: '5%'
        // marginVertical: -1//-14
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
        justifyContent: 'space-evenly',
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
        marginBottom: 20,
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
})

export default Dashboard;
