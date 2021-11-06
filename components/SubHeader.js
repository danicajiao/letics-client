import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';

// Create a component
export const SubHeader = (props) => {
    return (
        <Text {...props.title} style={styles.header}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20, 
        paddingTop: 40
    }
});