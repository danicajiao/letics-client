import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TextInput, Touchable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// let sets = [];

function DisplaySets({props}){
    const list = () => {
        return props.setArray.map((set) => {
            return(
                <View key={set.setNumber} style={{height: 20, marginTop: 5}}>
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
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Text style={styles.tableHead}>SET</Text>
                        <Text style={styles.tableHead}>WEIGHT</Text>
                        <Text style={styles.tableHead}>REPS</Text>
                        
                        <View style={{top: 17,position: 'absolute', width: '80%',height: 2, backgroundColor: '#C4C4C4'}}/>
                    </View>
                    <View style={{height: 80, }}>

                    <DisplaySets props={props}></DisplaySets>
                    </View>

                    

                </View>
                        <TouchableOpacity style={styles.addSet} onPress={pushSet}>
                            <Text style={styles.addSetText}>ADD SET</Text>
                        </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

function Row({ setNumber }) {
    return(
        // <View style={{flex: 1,}}>
            <View style={styles.rowStyle} >
                <View style={{flex: 0.1}}>
                    <Text>{setNumber}</Text>
                </View>
                <View style={styles.colStyle}>
                    {/* <Text>Input Weight</Text> */}
                    <TextInput style={styles.formArea} keyboardType={'number-pad'}></TextInput>
                </View>
                <View style={styles.colStyle}>
                    <TextInput style={styles.formArea} keyboardType={'number-pad'} ></TextInput>
                </View>
            </View>

        // </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: "#F3F3F3",
        width: "100%",
        borderRadius: 7,
    },
    exerciseName: {
        paddingLeft: '5%',
        paddingVertical: '5%',
        paddingBottom: '2.5%',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Roboto',
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
    },
    addSet: {
        alignSelf: 'flex-end',
        width: '75%',
        backgroundColor: '#C4C4C4',
        marginBottom: '1.5%',
        marginRight: '7.5%',
        borderRadius: 17,
    },
    addSetText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    }
});

export default ExerciseCard;