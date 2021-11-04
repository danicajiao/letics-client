import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';

function LogExercise(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cancelBtn}></TouchableOpacity>
            <TouchableOpacity style={styles.notesBtn}></TouchableOpacity>
            <Text style={styles.exerciseTitle}>Random Exercise</Text>

            <View style={styles.tableComponent}>
                <DataTable style={styles.table}>
                    <DataTable.Header>
                        <DataTable.Title>Set</DataTable.Title>
                        <DataTable.Title>Weight</DataTable.Title>
                        <DataTable.Title>Reps</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Set 1</DataTable.Cell>
                        <DataTable.Cell>155</DataTable.Cell>
                        <DataTable.Cell>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Set 2</DataTable.Cell>
                        <DataTable.Cell>175</DataTable.Cell>
                        <DataTable.Cell>3</DataTable.Cell>
                    </DataTable.Row>


                </DataTable>
            </View>

            <TouchableOpacity style={styles.addSetBtn}>
                <Text style={styles.addBtnText}>+ Add Set</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logBtn}>
                <Text style={styles.addBtnText}>LOG</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
    cancelBtn: {
        position: 'absolute',
        backgroundColor: 'red',
        width: 40,
        height: 40,
        left: 30,
        top: 40,
    },
    notesBtn: {
        position: 'absolute',
        backgroundColor: 'grey',
        width: 40,
        height: 40,
        right: 30,
        top: 40,
    },
    exerciseTitle: {
        textAlign: 'center',
        top: 100,
        fontSize: 30,
        fontWeight: 'bold'
    },
    tableComponent: {
        top: '20%',
        flex: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    table: {
        width: '90%',
    },
    addSetBtn: {
        backgroundColor: 'grey',
        width: '90%',
        height: 30,
        alignSelf: 'center'
    },
    addBtnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '200',
    },
    logBtn: {
        backgroundColor: 'gold',
        width: '90%',
        height: 30,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 200,
    },
})

export default LogExercise;