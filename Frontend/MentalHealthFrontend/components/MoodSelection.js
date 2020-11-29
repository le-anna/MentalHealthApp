import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'

export default function MoodSelection ({navigation}) {
    const [moodDropdown, setMoodDropdown] = useState([]);
    const [selectedMoods, setSelectedMoods] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/user/1/moods/filter`)
        .then((response) => response.json())
        .then((json) => setMoodDropdown(json))
        .catch((error) => console.error(error))   
    }, []) 

    const handleChange = (event) => {
        setSelectedMoods([...event])
    }

    return (
        <View style={styles.container}>
            <Text>Select Four</Text>
            <SelectMultiple
                 items={moodDropdown}
                 selectedItems={selectedMoods}
                 onSelectionsChange={handleChange}
                 maxSelect={4}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 15,
        flex: 1,
        fontFamily: 'Avenir'
    },
})