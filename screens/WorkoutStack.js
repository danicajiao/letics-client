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
    import WorkoutsList from './WorkoutsList';
import { Octicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';


const WorkoutListStack = createStackNavigator();

const WorkoutStack = () => {
    return (
        <WorkoutListStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <WorkoutListStack.Screen
                name="WorkoutList"
                component={WorkoutsList}
            >

            </WorkoutListStack.Screen>
            <WorkoutListStack.Screen
                name="ExerciseDetails"
                component={ExerciseDetails}
            >
            </WorkoutListStack.Screen>
        </WorkoutListStack.Navigator>
    );
}

function exerciseDescription(name) {
    if (name === 'Arnold Press')
    {
        return ('This exercise focuses on the shoulder muscles.'+ 
        ' Start in the position where the dumbbells are at shoulder height and your palms are facing you.' +
        ' Push the dumbbells above your head and rotate your hands while you are bringing the dumbbells up. At the top of the movement, your palms should be facing away from you.' +
        ' Return to the starting position to finish the rep.');
    }
    else if (name === 'Bench Press'){
        return ('This exercise focuses on the chest muscles. ' + 
        ' Start by lying flat on the bench. Grip the barbell firmly and lift the barbell off the rack. Lower the barbell towards the chest/sternum area' + 
        ' and pause when the bar is just above the chest. Press the barbell away from you until your arms are extended, but not locked, again to finish the rep.'
        );
    } 
    else if (name === 'Chest Dip'){
        return ('This exercise focuses on the chest muscles. ' + 
        ' Start by grabbing the parallel bars and lifting your entire body with only your arms holding you up.' + 
        ' Lower yourself by bending your arms until your shoulders a below your elbows. Then lift yourself back up to the starting position to complete the rep.')
    }
    else if (name === 'Crunch'){
        return ('This exercise focuses on the core muscles. ' +
        ' Start by lying on your back with feet flat and your knees bent. Place your hands behind your head. Lift your head by curling' +
        ' your shoulders and lift to a height of about 6 inches off the floor. Your lower body should be in the same position throughout the entire exercise.' + 
        ' Squeeze your abs while doing this movement. Return smoothly to the start position to complete the rep.')
    }
    else if (name === 'Deadlift'){
        return ('This exercise focuses on the leg muscles. ' +
        ' Start by facing the barbell with your shins close to the barbell. Place feet shoulder width apart and squat down to grip the barbell firmly.' +
        ' Lift the barbell by standing up. For the first half of the movement, you should use your legs to lift the barbell. For the second half ' +
        ' you should use your hips. You should keep your back straight as you lift the barbell. Lift until you are standing straight. ' +
        ' Safely return to the starting position to finish the rep.');
    }
    else if (name === 'Decline Bench Press'){
        return ('This exercise focuses on the chest muscles. ' + 
        ' Lay on the bench that is already in a declined position. Secure your feet to the bar at high end of the bench. ' + 
        ' Then firmly grip the barbell and lift off the rack. Lower the barbell towards the chest/sternum area' + 
        ' and pause when the bar is just above the chest. Press the barbell away from you until your arms are extended, but not locked, again to finish the rep.')
    }
    else if (name === 'Hanging Knee Raise'){
        return ('This exercise focuses on the core muscles. ' + 
        ' Start by holding on a pull-up bar and hanging off the floor. Your arms should be shoulder width apart.' + 
        ' Bring your knees up towards your chest while squeezing your abs. Pause at the top of movement, then slowly bring knees' +
        ' back to starting position to finish the rep. Do not swing while performing the movement.');
    } 
    else if (name === 'Incline Chest Fly'){
        return ('This exercise focuses on the chest muscles.' + 
        ' Lay on a bench that is inclined to a 30 or 45 degree angle. Start by raising the dumbbells over chest with' +
        ' elbows slightly bent and each palm is facing each other. The starting position should feel like a stretch to chest muscles.' + 
        ' Push the dumbbells closer to each other while bringing them above your face and pause. They should almost be touching each other.' +
        ' Then slowly return to the starting position to finish the rep.');
    }
    else if (name === 'Lunge'){
        return ('This exercise focuses on the leg muscles. ' + 
        ' Start by standing straight with your feet shoulder width apart. Step with one leg forward in a long stride. With each step, that leg' + 
        ' that is used to go forward has to bend 90 degrees. The other foot should have its knee be slightly above the ground. Pause for a moment' +
        ' then return to the starting position. Repeat this process with the other leg to complete a rep.');
    }
    else if (name === 'Squat'){
        return ('This exercise focuses on the leg muscles.' + 
        ' Place your body under the bar with the barbell resting on back of shoulders. Firmly grip the barbell.' +
        ' Then start by taking the barbell off the rack and have your body stand up straight with feet shoulder width apart.' +
        ' Then bend your body down as if you were sitting down until your hips are just below your knees.' + 
        ' Then push your back up by standing up, straightening your knees and hips until you are back in the starting position,' +
        ' completing the rep.');
    } 
    else if (name === 'Wide Pull Up'){
        return ('This exercise focuses on the back muscles.' + 
        ' Start by holding on to a pull-up bar and hanging off the floor. You should hold on to the bar as if your body were making' +
        ' a "Y" position. Then, keeping the back straight, pull body upwards towards the bar. Continue until your eyes are over the bar.' + 
        ' Pause at the top of the movement, then smoothly lower yourself back in the starting position to complete the rep.');
    }
}

function exerciseImg(name){
    let icon;
    if (name === 'Arnold Press') icon = require('../images/arnoldpress.png')
    else if (name === 'Bench Press') icon = require('../images/benchpress.png')
    else if (name === 'Crunch') icon = require('../images/Crunch.png')
    else if (name === 'Chest Dip') icon = require('../images/chestDip.png')
    else if (name === 'Deadlift') icon = require('../images/Deadlift.png')
    else if (name === 'Decline Bench Press') icon = require('../images/declinebenchpress.png')
    else if (name === 'Hanging Knee Raise') icon = require('../images/hangingkneeraises.png')
    else if (name === 'Incline Chest Fly') icon = require('../images/inclinechestfly.png') 
    else if (name === 'Lunge') icon = require('../images/Lunge.png')
    else if (name === 'Squat') icon = require('../images/Squat.png')
    else if (name === 'Wide Pull Up') icon = require('../images/widepullup.png')
    return icon;
}
function muscleImg(type){
    let icon;
    if (type === 'Shoulders') icon = require('../images/shoulderMuscles.jpg')
    else if (type === 'Chest') icon = require('../images/chestMuscles.jpg')
    else if (type === 'Core') icon = require('../images/coreMuscles.jpg')
    else if (type === 'Legs') icon = require('../images/legMuscles.jpg')
    else if (type === 'Back') icon = require('../images/backMuscles.jpg')
    return icon;
}

const ExerciseDetails = ({navigation, route}) => {
    const exercise = route.params.exercise;

    return (
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.ExerciseDetailsPage}>
                <Image style={styles.muscleImage} source={muscleImg(exercise.type)}/>
                <Text style={styles.exerciseTitle}>{exercise.value}</Text>
                <Text style={styles.exerciseInfo}>{exerciseDescription(exercise.value)}
                </Text>
                <Image style={styles.exerciseImage} source={exerciseImg(exercise.value)}/>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    ExerciseDetailsPage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    exerciseInfo: {
        width: '90%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    muscleImage: {
        width: '80%', 
        height: 200, 
        resizeMode: 'contain',
    },
    exerciseImage: {
        width: '90%', 
        height: 200, 
        resizeMode: 'contain',
        marginTop: 20,
        
    }
})

export default WorkoutStack;