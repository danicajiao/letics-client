import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ExerciseCard = ({ values, exerciseIndex, setFieldValue, handleChange, handleBlur, showAddSet = true }) => {

    const pushNewSet = () => ({
        weight: undefined,
        reps: undefined
    });

    return (
        <View style={styles.container}>
            <Text style={styles.exerciseName}>{values.exercises[exerciseIndex].name}</Text>
            <View style={styles.tableComponent}>
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <Text style={styles.tableHead}>SET</Text>
                    <Text style={styles.tableHead}>WEIGHT</Text>
                    <Text style={styles.tableHead}>REPS</Text>

                    <View style={{ top: 17, position: 'absolute', width: '80%', height: 2, backgroundColor: '#C4C4C4' }} />
                </View>
                <DisplaySets
                    values={values}
                    exerciseIndex={exerciseIndex}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                />
            </View>

            {showAddSet &&
                <TouchableOpacity style={styles.addSet} onPress={() => {
                    // console.log(values.exercises[exerciseIndex].sets)
                    setFieldValue(`exercises[${exerciseIndex}].sets`, [...values.exercises[exerciseIndex].sets, pushNewSet()]);
                    // console.log(values.exercises[exerciseIndex].sets)
                }}>
                    <Text style={styles.addSetText}>ADD SET</Text>
                </TouchableOpacity>
            }

        </View>
    );
}

const DisplaySets = ({ values, exerciseIndex, handleChange, handleBlur, setFieldValue }) => {
    const list = () => {
        return values.exercises[exerciseIndex].sets.map((set, index) => {
            return (
                <View key={index} style={{ height: 20, marginTop: 5 }}>
                    <Row
                        values={values}
                        exerciseIndex={exerciseIndex}
                        setIndex={index}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                    />
                </View>
            );
        });
    }
    return <View>{list()}</View>;
}

const Row = ({ values, exerciseIndex, setIndex, handleChange, handleBlur, setFieldValue }) => {
    return (
        // <View style={{flex: 1,}}>
        <View style={styles.rowStyle} >
            <View style={{ flex: 0.1 }}>
                <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{setIndex + 1}</Text>
            </View>
            <View style={styles.colStyle}>
                {/* <Text>Input Weight</Text> */}
                <TextInput
                    style={styles.formArea}
                    keyboardType={'number-pad'}
                    placeholder={'10'}
                    onChangeText={e => setFieldValue(`exercises[${exerciseIndex}].sets[${setIndex}].weight`, isNaN(parseInt(e)) ? undefined : parseInt(e))}
                    onBlur={handleBlur(`exercises[${exerciseIndex}].sets[${setIndex}].weight`)}
                    value={values.exercises[exerciseIndex].sets[setIndex].weight === undefined ? undefined : values.exercises[exerciseIndex].sets[setIndex].weight?.toString()}
                // onChangeText={handleChange}
                />
            </View>
            <View style={styles.colStyle}>
                <TextInput
                    style={styles.formArea}
                    keyboardType={'number-pad'}
                    placeholder={'5'}
                    onChangeText={e => setFieldValue(`exercises[${exerciseIndex}].sets[${setIndex}].reps`, isNaN(parseInt(e)) ? undefined : parseInt(e))}
                    onBlur={handleBlur(`exercises[${exerciseIndex}].sets[${setIndex}].reps`)}
                    value={values.exercises[exerciseIndex].sets[setIndex].reps === undefined ? undefined : values.exercises[exerciseIndex].sets[setIndex].reps.toString()}
                />
            </View>
        </View >

        // </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        // width: "100%",
        borderRadius: 7,
        marginVertical: '5%',
        paddingVertical: '5%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    exerciseName: {
        paddingLeft: '5%',
        paddingBottom: '2.5%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    tableHead: {
        fontWeight: "bold",
        fontSize: 14,
    },
    tableComponent: {
        // height: 100,
        // backgroundColor: 'green',
    },
    row: {
        // height: 10
    },
    formArea: {
        width: '70%',
        // paddingLeft: '10%',
        // justifyContent: 'center',
        // alignSelf: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: 5,
        height: 16,
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
    },
    rowStyle: {
        // flex:0.33, 
        // backgroundColor: 'red',
        // justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        left: 25,
        // position: 'relative',
    },
    colStyle: {
        flex: 0.2,
        // backgroundColor: 'purple', 
        justifyContent: 'center',
        // paddingLeft: 50
    },
    addSet: {
        alignSelf: 'flex-end',
        width: '75%',
        backgroundColor: '#C4C4C4',
        marginTop: '3%',
        marginRight: '7.5%',
        borderRadius: 17,
    },
    addSetText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default ExerciseCard;
