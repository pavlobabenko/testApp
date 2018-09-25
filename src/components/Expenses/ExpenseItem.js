import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import moment from 'moment';

export const ExpenseItem = (props) => {
    const {date, value, onSelect} = props;
    return (
        <TouchableOpacity style={styles.container} onPress={onSelect}>
            <Text style={styles.dateText}>
                {moment(date).format('MMM D, YYYY HH:mm')}
            </Text>
            <Text style={styles.valueText}>
                -{value}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 20
    },
    valueText: {
        color: 'red',
        fontSize: 20
    }
});