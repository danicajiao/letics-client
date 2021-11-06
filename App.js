import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Screens
import LoggedOut from './screens/LoggedOut';
import Register from './screens/Register';
import Login from './screens/Login';
import Workouts from './screens/Workouts';
<<<<<<< HEAD
import LogExercise from './screens/LogExercise'
import WorkoutLog from './screens/WorkoutLog'

export default function App() {
  return (
    //<Login />
    <LogExercise />
    // <Register />
=======
import Dashboard from './screens/Dashboard';

export default function App() {
  return (
    //<Register />
    <Dashboard />
>>>>>>> 2d2c3dcb25c59cbcd8e0eb719dd29856d58d8477
  );
}
