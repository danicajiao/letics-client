import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Touchable, Modal} from 'react-native';
import { Octicons } from '@expo/vector-icons';
//import LogExercise from './../screens/LogExercise';
import LogExercise from './LogExercise';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { WorkoutsList } from './WorkoutsList';

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

function DisplayWorkouts({popExercise}) {
    const state = {};

    // navigation object for changing pages
    const navigation = useNavigation();
     
    // console.log(sets.length);
    const list = () => {
        return workouts.map((exercise) => {
          return (
            <View key={exercise.number}>
                <TouchableOpacity style={styles.exerciseBubble} onLongPress={() => {
                    for (let index = 0; index < workouts.length; index++)
                    {
                        if (workouts[index].number === exercise.number)
                        {
                            popExercise(index);
                            break;
                        }
                    }
                }}
                onPress={() => {
                    navigation.navigate('LogExercise')
                }}>
                    <Text style={styles.exerciseText}>{exercise.name}</Text>
                </TouchableOpacity>
            </View>
          );
        });
      };
    
      return <View>{list()}</View>;
}



function WorkoutLog(){
    const [count, setCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    
    function pushNewExercise(exerciseName) {
        if (workouts.length < 3){
            workouts.push(
                {
                   number: workouts.length + 1,
                   name: exerciseName,
                }
            )
            setCount(count + 1);
        }
    }
    
    function popExercise(rmIndex){
    
        if (rmIndex > -1) {
            workouts.splice(rmIndex, 1);
        }
        for (let i = 0; i < workouts.length; i++)
        {
            workouts[i].number = i + 1;
        }
        setCount(count - 1)
    
    }

        return (
          <View style={styles.container}>
              <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => setModalOpen(false)}>
                        <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
                    </TouchableOpacity>
                    <View style={styles.modalList}>
                        <TouchableOpacity style={styles.modalExercise} onPress={function(){pushNewExercise('Bench'); setModalOpen(false)}}>
                            <Text style={styles.modalText}>Bench</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalExercise} onPress={function(){pushNewExercise('Squat'); setModalOpen(false)}}>
                            <Text style={styles.modalText}>Squat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalExercise} onPress={function(){pushNewExercise('Deadlift'); setModalOpen(false)}}>
                            <Text style={styles.modalText}>Deadlift</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </Modal>

              {/* <TouchableOpacity onPress={() => setModalOpen(false)}>
                        <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
                    </TouchableOpacity> */}
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Workout for</Text>
                <Text style={styles.title}>{currentDay()}</Text>
            </View>
            <View style={styles.exerciseList}>
                <DisplayWorkouts popExercise={popExercise} />
            </View>
    
            <TouchableOpacity style={styles.addBtn} onPress={() => setModalOpen(true)}>
                    <Text style={styles.addBtnText}>+ Add Exercise</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.logBtn}>
                    <Text style={styles.addBtnText}>LOG Workout</Text>
            </TouchableOpacity>
            
    
          </View>
          );
}

function currentDay(){
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
        flex: 0.5,
        width: '80%',
        alignSelf: 'center',
        top: 120,
        flexDirection: 'column',
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
        
    },
    exerciseBubble: {
        marginTop: 10,
        width: '100%',
        height: 40,
        backgroundColor: 'grey',
        borderRadius: 10,
    },
    addBtn: {
        marginTop: 150,
        backgroundColor: 'grey',
        width: '90%',
        height: 30,
        alignSelf: 'center'
    },
    addBtnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '200',
    },
    logBtn: {
        backgroundColor: 'gold',
        width: '90%',
        height: 30,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 150,
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
    }
})
export default WorkoutLog;