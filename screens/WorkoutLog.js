import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Touchable} from 'react-native';


let workouts = [];

function DisplayWorkouts() {
    // console.log(sets.length);
    const list = () => {
        return workouts.map((exercise) => {
          return (
            <View key={exercise.number}>
                <TouchableOpacity style={styles.exerciseBubble}>
                    <Text>Exercise: {exercise.number}</Text>
                </TouchableOpacity>
            </View>
          );
        });
      };
    
      return <View>{list()}</View>;
}


class WorkoutLog extends React.Component {

    constructor() {
        super();
        // Define the initial state:
        this.state = { count: 0 };
    }

    pushNewExercise = () => {
        if (workouts.length < 3){

            workouts.push(
                {
                   "number": workouts.length + 1,
                }
            )
    
            this.setState({count: (this.state.count + 1)});
        }
    }

    render () {

        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.cancelBtn}></TouchableOpacity>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Workout for</Text>
                <Text style={styles.title}>{currentDay()}</Text>
            </View>
            <View style={styles.exerciseList}>
                {/* <TouchableOpacity style={styles.exerciseBubble}>
                    <Text>Exercise 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exerciseBubble}>
                    <Text>Exercise 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exerciseBubble}>
                    <Text>Exercise 3</Text>
                </TouchableOpacity> */}
                <DisplayWorkouts />
            </View>
    
            <TouchableOpacity style={styles.addBtn} onPress={this.pushNewExercise}>
                    <Text style={styles.addBtnText}>+ Add Exercise</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.logBtn}>
                    <Text style={styles.addBtnText}>LOG Workout</Text>
            </TouchableOpacity>
            
    
          </View>
          );
        }
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
    cancelBtn: {
        position: 'absolute',
        backgroundColor: 'red',
        width: 40,
        height: 40,
        left: 30,
        top: 40,
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
        justifyContent: 'space-evenly'
    },
    exerciseBubble: {
        width: '100%',
        height: 40,
        backgroundColor: 'grey',
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
})
export default WorkoutLog;