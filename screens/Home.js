import React from 'react'
import { View } from 'react-native'
// for the Navigation Bar
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient'; // yellow linear gradient for button
import WorkoutStack from './WorkoutStack';
import WorkoutLog from './WorkoutLog';
import Dashboard from './Dashboard';
import History from './History';
import WorkoutsList from './WorkoutsList';
import Profile from './Profile';
import NewExercise from './NewExercise';

const Placeholder = () => <View />

// navigation bar component
const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                animationEnabled: false,
                headerShown: false,
                presentation: 'modal'
            }}
        >
            <RootStack.Screen
                name="Tabs"
                component={Home}
            />
            <RootStack.Screen
                name="NewExercise"
                component={NewExercise}
                options={{ animationEnabled: true }}
            />
        </RootStack.Navigator>
    )
}

//function () {
const Home = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="History" component={History} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="time" size={24} color="black" />
                ),
            }} />
            <Tab.Screen name="Add" component={Placeholder} options={{
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
            }}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("NewExercise");
                    }
                })}
            />
            {/* <Tab.Screen name="LogExercise" component={LogExercise} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                ),
                headerShown: false,
            }} /> */}
            <Tab.Screen name="Workouts" component={WorkoutStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={24} color="black" />
                )
            }} />
        </Tab.Navigator>
    );
}

export default RootStackScreen;
