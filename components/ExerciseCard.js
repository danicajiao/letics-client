import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, Touchable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// let sets = [];

function DisplaySets({props}){
    const list = () => {
        return props.setArray.map((set) => {
            return(
                <View key={set.setNumber} style={{height: 40,}}>
                    <Row setNumber={set.setNumber}></Row>
                </View>
            )
        })
    }
    return <View>{list()}</View>;
}

function ExerciseCard(props){

    const [counter, setCounter] = useState(0);
    // console.log(props.setArray)
    function pushSet() {
        if (props.setArray.length < 3){
            props.setArray.push(
                {
                    setNumber: props.setArray.length + 1,
                    weight: 0,
                    reps: 0,
                }
            )
            setCounter(counter + 1);
        }
        // console.log(props.setArray);
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.exerciseName}>{props.exerciseName}</Text>
                <View style={styles.tableComponent}>
                    
                    <DisplaySets props={props}></DisplaySets>
                    

                </View>
                <TouchableOpacity style={styles.addSet} onPress={pushSet}>
                    <Text>ADD SET</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

function Row({ setNumber }) {
    return(
        <View style={{flex: 1,}}>
            <View style={styles.rowStyle} >
                <View style={{flex: 0.2}}>
                    <Text>{setNumber}</Text>
                </View>
                <View style={styles.colStyle}>
                    {/* <Text>Input Weight</Text> */}
                    <TextInput style={styles.formArea}></TextInput>
                </View>
                <View style={styles.colStyle}>
                    <TextInput style={styles.formArea}></TextInput>
                </View>
            </View>

        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: "#F3F3F3",
        width: "90%",
    },
    exerciseName: {
        paddingLeft: '5%',
        paddingVertical: '5%',
        fontWeight: 'bold'
    },
    tableHead: {
        fontWeight: 'bold'
    },
    tableComponent: {
        height: 100,
        // backgroundColor: 'green',
    },
    row: {
        height: 10
    },
    formArea: {
        width: '50%',
        // justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'lightgrey',
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
        flex:0.33, 
        // backgroundColor: 'red',
        // justifyContent: 'center',
        flexDirection: 'row'
    },
    colStyle: {
        flex: 0.40, 
        // backgroundColor: 'purple', 
        justifyContent: 'center',
    },
    addSet: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'grey',
        marginBottom: '1.5%',
    },
});

export default ExerciseCard;