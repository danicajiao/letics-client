import React from 'react';
import { render } from 'react-dom';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { DataTable, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { Colors } from './../components/styles';

let sets = [];

function DisplaySets() {
    console.log(sets.length);
    const list = () => {
        return sets.map((set) => {
          return (
            <View key={set.number}>
                <DataTable.Row>
                    <DataTable.Cell>{set.number}</DataTable.Cell>
                    <DataTable.Cell>
                        {set.weight}
                    </DataTable.Cell>
                    <DataTable.Cell>{set.reps}</DataTable.Cell>
                </DataTable.Row>
            </View>
          );
        });
      };
    
      return <View>{list()}</View>;
}

// this has the render() function, and this allows us to re-render the screen with new
// sets if the user adds it.
class LogExercise extends React.Component {

    constructor() {
        super();
        // Define the initial state:
        this.state = { count: 0 };
    }

    pushNewSet = () => {
        if (sets.length < 3){
            sets.push(
                {
                   "number": sets.length + 1,
                   "weight": 0,
                   "reps": 0
                }
            )
    
            this.setState({count: (this.state.count + 1)});

        }
    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.cancelBtn}></TouchableOpacity>
                <TouchableOpacity style={styles.notesBtn}></TouchableOpacity>
                <Text style={styles.exerciseTitle}>Random Exercise</Text>

                <Formik
                
                    initialValues={{weight: '', reps: ''}}
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

                                    <DisplaySets />

                                </DataTable>
                            </View>

                            <TouchableOpacity style={styles.addSetBtn} onPress={this.pushNewSet}>
                                <Text style={styles.addBtnText}>+ Add Set</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logBtn}>
                                <Text style={styles.addBtnText}>LOG</Text>
                            </TouchableOpacity>

                        </View>
                    )}



                </Formik>
                

            </View>
        );
}
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
        alignItems: 'center',
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
});

export default LogExercise;