import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoggedOut from './screens/LoggedOut';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import RootStackScreen from './screens/Home';
import WorkoutLog from './screens/WorkoutLog';
import Dashboard from './screens/Dashboard';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  },
};

const Stack = createNativeStackNavigator();

// main
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={RootStackScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
