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
import Verfiy from './screens/Verfiy';
import Forgot from './screens/Forgot';
import Reauthenticate from './screens/Reauthenticate';

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
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="LoggedOut" component={LoggedOut} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verfiy} />
        <Stack.Screen name="Home" component={RootStackScreen} />
        <Stack.Screen name="Reauthenticate" component={Reauthenticate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
