import React from 'react'
import { StyleSheet, Text } from 'react-native';

// Create a component
export const Header = (props) => {
    return (
        <Text style={styles.header}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 20
    }
});
