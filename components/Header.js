import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';

// create a component
export class Header extends Component {
    render() {
        return (
            <Text {...this.props.title} style={styles.header}>{this.props.title}</Text>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default Header;
