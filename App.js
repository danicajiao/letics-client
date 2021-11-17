import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// for the Navigation Bar
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient'; // yellow linear gradient for button

// Screens
import LoggedOut from './screens/LoggedOut';
import Register from './screens/Register';
import Login from './screens/Login';
import Workouts from './screens/Workouts';
import LogExercise from './screens/LogExercise';
import WorkoutLog from './screens/WorkoutLog';
import Dashboard from './screens/Dashboard';
import History from './screens/History';
import WorkoutsList from './screens/WorkoutsList';

// navigation bar component
const Tab = createBottomTabNavigator();

//function MyTabs() {
function MyTabs() {
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
          <Ionicons name="time" size={24} color="black" />
        ),
        headerShown: false,
      }} />
      <Tab.Screen name="Add" component={WorkoutLog} options={{
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
          <Ionicons name="add-circle" color='orange' size={68}/>
          </View>
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
          <Ionicons name="person" size={24} color="black" />
        ),
        headerShown: false,
      }} />
    </Tab.Navigator>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  },
};

// main
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}
