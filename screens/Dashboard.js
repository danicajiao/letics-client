import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { Octicons } from '@expo/vector-icons';
import { Colors } from './../components/styles';
import { Header } from './../components/Header';
import { CustomButton } from './../components/CustomButton';
import { SubHeader } from '../components/SubHeader';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'

// beginning of current week
function beginWeek() {
    // cool calculation to get first day of week (anchor date)
    let date = new Date();
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    return "Highlights for the week of " + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

// json parser
function workoutParser() {
    // stuff
}

const Dashboard = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Header title={'Dashboard'} />
            <SubHeader title={'DAILY WORKOUT HISTORY'}/>
            <SubHeader title={ beginWeek() }/>
            <LineChart
                data={line}
                width={380} // from react-native
                height={220}
                yAxisLabel={''}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 50,
                    marginHorizontal: 15,
                    borderRadius: 16
                }}
            />
            <View style={{flex: 0.1}}>
                <TouchableOpacity style={styles.logBtn} onPress={() => Alert.alert('Benchpress chart')}>
                    <Text style={styles.logBtnText}>Benchpress</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logBtn} onPress={() => Alert.alert('Squat chart')}>
                    <Text style={styles.logBtnText}>Squat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logBtn} onPress={() => Alert.alert('Deadlift chart')}>
                    <Text style={styles.logBtnText}>Deadlift</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
};

// prototype plot for daily fluctuations in weight
// sidenote: this is static data used for organzing how I want things to look
// need to make it work with database
const line = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    datasets: [
        {
            data: [175, 165, 180, 180, 185, 170],
            strokeWidth: 2, // optional
        },
    ],
};

const StatusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: -14
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
        fontFamily: 'Roboto'
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
        fontFamily: 'Roboto'
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
