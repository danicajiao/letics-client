import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, Touchable } from 'react-native'
import { Octicons } from '@expo/vector-icons';
// for the Navigation Bar
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient'; // yellow linear gradient for button

import Workouts from './Workouts';
import LogExercise from './LogExercise';
import WorkoutLog from './WorkoutLog';
import Dashboard from './Dashboard';
import History from './History';
import WorkoutsList from './WorkoutsList';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const CreateNewPlaceholder = () => <View/>

// navigation bar component
const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
        <RootStack.Navigator
            headerMode='none'
            screenOptions={{animationEnabled: false}}
            mode='modal'
        >
            <RootStack.Screen 
                name="Tabs"
                component={Home}
            />

            <RootStack.Screen 
                name="WorkoutLog"
                component={WorkoutLog}
                options={{ animationEnabled: true }}
            />
        </RootStack.Navigator>
    )
}

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
            {/* <Tab.Screen name="WorkoutLog" component={WorkoutLog} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} /> */}
            <Tab.Screen name="Add" component={CreateNewPlaceholder} options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -19, // space from bottombar
                            height: 68,
                            width: 68,
                            borderRadius: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Ionicons name="add-circle" color='orange' size={68} />
                    </View>
                ),
                headerShown: false
            }} 
                listeners={({navigation}) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("WorkoutLog");
                    }
                })}
            />
            {/* <Tab.Screen name="LogExercise" component={LogExercise} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} /> */}
            <Tab.Screen name="Workouts" component={WorkoutsList} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} />
        </Tab.Navigator>
    );
}

export default RootStackScreen; 
