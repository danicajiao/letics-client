import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// for the Navigation Bar
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import LoggedOut from './screens/LoggedOut';
import Register from './screens/Register';
import Login from './screens/Login';
import Workouts from './screens/Workouts';
import LogExercise from './screens/LogExercise';
import WorkoutLog from './screens/WorkoutLog';
import Dashboard from './screens/Dashboard';

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
      }} />
      <Tab.Screen name="Workouts" component={WorkoutLog} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="barbell" size={24} color="black" />
        ),
      }} />
    </Tab.Navigator>
  );
}

// main
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
