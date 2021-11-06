import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text } from 'react-native-paper';  

// rout objects for rendering tabs
const DashboardRoute = () => <Text>Dashboard</Text>;
const HistoryRoute = () => <Text>History</Text>;
const WorkoutsRoute = () => <Text>Workouts</Text>;
const ProfileRoute = () => <Text>Profile</Text>;

// taskbar component
const TaskBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', icon: 'queue-music' },
        { key: 'history', title: 'History', icon: 'album' },
        { key: 'workouts', title: 'Workouts', icon: 'ios-barbell-outline'},
        { key: 'profile', title: 'Profile', icon: 'history' }
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: DashboardRoute,
        history: HistoryRoute,
        workouts: WorkoutsRoute,
        profile: ProfileRoute,
    });

    return (
    <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={renderScene}
    barStyle={{ backgroundColor: 'white' }} // controls bar color
    />
    );
};

export default TaskBar;
