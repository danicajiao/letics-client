import { validateYupSchema } from 'formik';
import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ExerciseCard = ({ values, exerciseIndex, setArray, setFieldValue, handleChange, handleBlur }) => {
    const pushNewSet = () => ({
        weight: '',
        reps: ''
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.exerciseName}>{values.exercises[exerciseIndex].name}</Text>
                <View style={styles.tableComponent}>
                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                        <Text style={styles.tableHead}>SET</Text>
                        <Text style={styles.tableHead}>WEIGHT</Text>
                        <Text style={styles.tableHead}>REPS</Text>

                        <View style={{ top: 17, position: 'absolute', width: '80%', height: 2, backgroundColor: '#C4C4C4' }} />
                    </View>
                    <View style={{ height: 80, }}>
                        <DisplaySets
                            values={values}
                            exerciseIndex={exerciseIndex}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                    </View>



                </View>
                <TouchableOpacity style={styles.addSet} onPress={() => {
                    // console.log(values.exercises[exerciseIndex].sets)
                    setFieldValue(`exercises[${exerciseIndex}].sets`, [...values.exercises[exerciseIndex].sets, pushNewSet()]);
                    // console.log(values.exercises[exerciseIndex].sets)
                }}>
                    <Text style={styles.addSetText}>ADD SET</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const DisplaySets = ({ values, exerciseIndex, handleChange, handleBlur }) => {
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
                    />
                </View>
            );
        });
    }
    return <View>{list()}</View>;
}

const Row = ({ values, exerciseIndex, setIndex, handleChange, handleBlur }) => {
    return (
        // <View style={{flex: 1,}}>
        <View style={styles.rowStyle} >
            <View style={{ flex: 0.1 }}>
                <Text>{setIndex + 1}</Text>
            </View>
            <View style={styles.colStyle}>
                {/* <Text>Input Weight</Text> */}
                <TextInput
                    style={styles.formArea}
                    keyboardType={'number-pad'}
                    placeholder={'10'}
                    onChangeText={handleChange(`exercises[${exerciseIndex}].sets[${setIndex}].weight`)}
                    onBlur={handleBlur(`exercises[${exerciseIndex}].sets[${setIndex}].weight`)}
                    value={values.exercises[exerciseIndex].sets[setIndex].weight}
                // onChangeText={handleChange}
                />
            </View>
            <View style={styles.colStyle}>
                <TextInput
                    style={styles.formArea}
                    keyboardType={'number-pad'}
                    placeholder={'5'}
                    onChangeText={handleChange(`exercises[${exerciseIndex}].sets[${setIndex}].reps`)}
                    onBlur={handleBlur(`exercises[${exerciseIndex}].sets[${setIndex}].reps`)}
                    value={values.exercises[exerciseIndex].sets[setIndex].reps}
                />
            </View>
        </View >

        // </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: "#F3F3F3",
        width: "100%",
        borderRadius: 7,
        marginVertical: '5%'
    },
    exerciseName: {
        paddingLeft: '5%',
        paddingVertical: '5%',
        paddingBottom: '2.5%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    tableHead: {
        fontWeight: "bold",
        fontSize: 14,
    },
    tableComponent: {
        height: 100,
        // backgroundColor: 'green',
    },
    row: {
        height: 10
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
        marginBottom: '3%',
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
