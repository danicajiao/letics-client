import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';

// Create a component
export const Header = (props) => {
    return (
        <Text {...props.title} style={styles.header}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingLeft: 20
    }
});
