import React, { useState } from 'react'
import { StyleSheet, Alert, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Agenda } from 'react-native-calendars';


const History = () => {
    const [items, setItems] = useState({});

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                // testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    const renderKnob = () => {
        return (
            <TouchableOpacity style={styles.knob}></TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
            <StatusBar barStyle={'dark-content'} />
            <Agenda
                // items={{
                //     '2021-11-10': [{ name: 'item 1 - any js object', height: 80 }],
                //     '2021-11-11': [{ name: 'item 1 - any js object', height: 80 }],
                // }}
                items={items}
                renderItem={renderItem}
                loadItemsForMonth={loadItems}
                // Specify how agenda knob should look like
                // renderKnob={renderKnob}
                selected={'2021-11-10'}
                showClosingKnob={true}
                theme={{
                    selectedDayBackgroundColor: 'orange',
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    knob: {
        backgroundColor: 'lightgray',
        width: 100,
        height: 100,
        borderRadius: 10
    }
});

export default History;
