import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Modal, Alert, ScrollView } from 'react-native';
import { Octicons } from '@expo/vector-icons';
//import LogExercise from './../screens/LogExercise';
import LogExercise from './LogExercise';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import WorkoutsList from './WorkoutsList';
import { Header } from './../components/Header';
import ExerciseCard from './../components/ExerciseCard'

let workouts = [];

// native stack navigator for navigating between screens
const Stack = createNativeStackNavigator();

// stack with 1 route, the LogExercise page
const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="LogExercise"
                    component={LogExercise}
                //options={{ title: 'Welcome' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



function DisplayWorkouts({ popExercise }) {
    const state = {};

    // navigation object for changing pages
    const navigation = useNavigation();

    // console.log(sets.length);
    const list = () => {
        return workouts.map((exercise) => {
            return (
                <View key={exercise.number} style={styles.exerciseBubble}>
                    <ExerciseCard 
                        setArray={exercise.sets}
                        exerciseName={exercise.name}
                        onLongPress={() => {
                            for (let index = 0; index < workouts.length; index++) {
                                if (workouts[index].number === exercise.number) {
                                    popExercise(index);
                                    break;
                                }
                            }
                        }}
                        onPress={() => {
                            navigation.navigate('LogExercise')
                        }}>
                        <Text style={styles.exerciseText}>{exercise.name}</Text>
                    </ExerciseCard>
                </View>
            );
        });
    };

    return <View>{list()}</View>;
}

const deleteDialog = (navigation) =>
        Alert.alert(
            "Confirm Operation",
            "Are you sure you want to delete this workout?",
            [
                { text: "Cancel"},
                { 
                    text: "Yes",
                    onPress: () => {
                        workouts = [];
                        navigation.goBack()
                    },
                }
            ]
        );

function WorkoutLog({navigation}) {
    const [count, setCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    

    function pushNewExercise(exerciseName) {
        if (workouts.length < 3) {
            workouts.push(
                {
                    number: workouts.length + 1,
                    name: exerciseName,
                    sets: [],
                }
                
            )
            // console.log(workouts);
            setCount(count + 1);
        }
    }

    function popExercise(rmIndex) {

        if (rmIndex > -1) {
            workouts.splice(rmIndex, 1);
        }
        for (let i = 0; i < workouts.length; i++) {
            workouts[i].number = i + 1;
        }
        setCount(count - 1)

    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => setModalOpen(false)}>
                        <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
                    </TouchableOpacity>
                    <WorkoutsList pushNewExercise={pushNewExercise} setModalOpen={setModalOpen} />
                </View>
            </Modal>
            <ScrollView>

                {/* // here we will add code to reset the data */}
                <TouchableOpacity onPress={() => {deleteDialog(navigation);}}> 
                        <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
                </TouchableOpacity>

                <Header title={"New Workout"} />
                {/* <View style={styles.titlecontainer}>
                    <Text style={styles.title}>Workout for</Text>
                    <Text style={styles.title}>{currentDay()}</Text>
                </View> */}
                <View style={styles.exerciseList}>
                    <DisplayWorkouts popExercise={popExercise} />
                </View>

                <View style={{flex: 0.1}}>
                    <TouchableOpacity style={styles.addBtn} onPress={() => setModalOpen(true)}>
                        <Text style={styles.addBtnText}>Add Exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logBtn}>
                        <Text style={styles.logBtnText}>LOG</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

function currentDay() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return month + ' / ' + date + ' / ' + year;
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
export default WorkoutLog;
