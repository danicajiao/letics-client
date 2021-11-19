import React from 'react'
// for the Navigation Bar
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Workouts from './Workouts';
import LogExercise from './LogExercise';
import WorkoutLog from './WorkoutLog';
import Dashboard from './Dashboard';
import History from './History';
import WorkoutsList from './WorkoutsList';

// navigation bar component
const Tab = createBottomTabNavigator();

//function () {
const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={24} color="black" />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="WorkoutLog" component={WorkoutLog} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="LogExercise" component={LogExercise} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Workouts" component={WorkoutsList} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} />
        </Tab.Navigator>
    );
}

export default Home;
