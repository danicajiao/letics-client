import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Create a component
export const TaskBar = (props) => {
    return (
        <Text {...props.title} style={styles.header}>{props.title}</Text>
    );
}

//export const tabs = [{
    //rout
//}]