import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MoodItem ({item, pressHandler}) {
    return (
        <TouchableOpacity
            onPress={() => pressHandler()}>
            <Text style={styles.item}>Testing</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    }
})