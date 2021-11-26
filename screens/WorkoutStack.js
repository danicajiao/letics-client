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

const ExerciseDetails = ({navigation, route}) => {
    const exercise = route.params.exercise;
    return (
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name={'arrow-left'} size={36} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.ExerciseDetailsPage}>
                <Image style={{width: 200, height: 200, }} source={require('../images/shoulderMuscles.jpg')}/>
                <Text style={styles.exerciseTitle}>{exercise.value}</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis feugiat vivamus at augue eget. Ultrices sagittis orci a scelerisque purus semper eget. Amet justo donec enim diam vulputate. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Aliquam malesuada bibendum arcu vitae elementum curabitur. Felis bibendum ut tristique et egestas quis. Enim diam vulputate ut pharetra. Sit amet consectetur adipiscing elit pellentesque. Venenatis urna cursus eget nunc scelerisque viverra. In metus vulputate eu scelerisque felis imperdiet. Sit amet purus gravida quis blandit turpis. Ut tortor pretium viverra suspendisse potenti. Velit sed ullamcorper morbi tincidunt ornare. Mi proin sed libero enim sed faucibus turpis in eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt.

Et netus et malesuada fames ac turpis egestas maecenas pharetra.  Est pellentesque elit ullamcorper dignissim cras. Etiam sit amet nisl purus in mollis nunc sed id. Pharetra et ultrices neque ornare aenean euismod elementum. Vitae semper quis lectus nulla at volutpat diam. Sed elementum tempus egestas sed sed. Ridiculus mus mauris vitae ultricies leo integer malesuada. Pharetra diam sit amet nisl suscipit. Aliquet nibh praesent tristique magna sit amet purus gravida quis. Integer eget aliquet nibh praesent tristique magna.
                </Text>

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
})

export default WorkoutStack;