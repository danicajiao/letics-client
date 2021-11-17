import React, { useState } from 'react';
import { render } from 'react-dom';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Formik } from 'formik';
import { Colors } from './../components/styles';

let sets = [];

function DisplaySets({ props }) {
    const list = () => {
        return sets.map((set) => {
            let weightString = 'set' + set.number + 'weight';
            let repsString = 'set' + set.number + 'reps';
            // console.log("---------")
            // console.log(weightString);
            // console.log(repsString);
            return (

                <View key={set.number}>
                    <DataTable.Row>
                        <DataTable.Cell>{set.number}</DataTable.Cell>
                        <DataTable.Cell>
                            <View style={styles.formArea}>
                                <TextInput style={styles.inputArea}
                                    placeholder='0'
                                    onChangeText={props.handleChange(weightString)}
                                    onBlur={props.handleBlur(weightString)}
                                    value={props.values.weightString}
                                    keyboardType="number-pad"
                                >
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <View style={styles.formArea}>
                                <TextInput style={styles.inputArea}
                                    placeholder='0'
                                    onChangeText={props.handleChange(repsString)}
                                    onBlur={props.handleBlur(repsString)}
                                    value={props.values.repsString}
                                    keyboardType="number-pad"
                                >
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                </View>
            );
        });
    };

    return <View>{list()}</View>;
}

function LogExercise() {

    const [count, setCount] = useState(0);

    function pushNewSet() {
        if (sets.length < 3) {
            sets.push(
                {
                    "number": sets.length + 1,
                    "weight": 0,
                    "reps": 0
                }
            )

            setCount(count + 1);

        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cancelBtn}></TouchableOpacity>
            <TouchableOpacity style={styles.notesBtn}></TouchableOpacity>
            <Text style={styles.exerciseTitle}>Random Exercise</Text>
            <Formik

                initialValues={
                    {
                        set1weight: '',
                        set1reps: '',
                        set2weight: '',
                        set2reps: '',
                        set3weight: '',
                        set3reps: '',

                    }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(props) => (
                    // CHECK THIS!!!!!!!!!!!!!!!
                    <View style={styles.tableComponent}>

                        <View style={styles.tableComponent}>
                            <DataTable style={styles.table}>
                                <DataTable.Header>
                                    <DataTable.Title>Set</DataTable.Title>
                                    <DataTable.Title>Weight</DataTable.Title>
                                    <DataTable.Title>Reps</DataTable.Title>
                                </DataTable.Header>

                                <DisplaySets props={props} />

                            </DataTable>
                        </View>

                        <TouchableOpacity style={styles.addSetBtn} onPress={pushNewSet}>
                            <Text style={styles.addBtnText}>+ Add Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logBtn} onPress={props.handleSubmit}>
                            <Text style={styles.addBtnText}>LOG</Text>
                        </TouchableOpacity>

                    </View>
                )}



            </Formik>


        </View>
    );

}

// const MyTextInput = ({ label, icon, ...props }) => {
//     return (
//         <View style={styles.formArea}>
//             <TextInput style={styles.textInput} {...props} />
//         </View>
//     );
// };

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
    forms: {
        flex: 1,
        // paddingTop: 20,
        // alignItems: 'center',
        // backgroundColor: 'green',
    },
    formArea: {
        width: "90%",
    },
    tableComponent: {
        top: '20%',
        flex: 0.5,
        // backgroundColor: 'red',
        // alignItems: 'center',
    },
    table: {
        width: '90%',
    },
    addSetBtn: {
        marginTop: 200, // CHANGE THIS
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
        bottom: 10,
    },
    formArea: {
        // backgroundColor: 'red',
    },
    inputArea: {
        backgroundColor: 'lightgrey',
        flex: 1,
        height: '100%',
        width: '70%',
    }
});

export default LogExercise;
