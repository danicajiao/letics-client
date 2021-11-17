import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export const ExerciseCard = (props) => {
    let tableHead = ['Set', 'Weight', 'Reps'];
    let tableData = [
        ['1', 20, '10'],
        ['2', '20', '8'],
        ['3', '20', '6'],
        ['4', '20', '4']
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.exerciseName}>ARNOLD PRESS</Text>
                <View style={styles.tableComponent}>
                    <Table>
                        <Row data={tableHead} style={{ borderBottomWidth: 2 }} textStyle={{ fontWeight: 'bold' }} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>

                </View>
            </View>
        </SafeAreaView >
    );
}

function DisplaySets({ props }) {
    return (
        <View>

        </View>
    );
}

const SetInput = () => {
    return (
        <View style={styles.formArea}>
            <TextInput style={styles.textInput} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: "#F3F3F3",
        width: "90%"
    },
    exerciseName: {
        paddingLeft: '5%',
        paddingVertical: '5%',
        fontWeight: 'bold'
    },
    tableHead: {
        fontWeight: 'bold'
    },
    row: {
        height: 10
    },
    formArea: {
        flex: 1,
        justifyContent: 'center'
        // backgroundColor: 'red',
        // width: 100,
        // height: 100
    },
    textInput: {
        backgroundColor: 'lightgray',
        marginTop: 8,
        paddingLeft: 5,
        paddingRight: 20,
        paddingVertical: 2,
        borderRadius: 5,
    }
});
