import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'

export default function MoodSelection ({route, navigation}) {
    const [moodDropdown, setMoodDropdown] = useState([]);
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [test, setTest] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/user/1/moods/filter`)
        .then((response) => response.json())
        .then((json) => setMoodDropdown(json))
        .catch((error) => console.error(error))   
    }, []) 

    const handleChange = (event) => {
        setSelectedMoods([...event]);
        var temp = event.map(obj => obj.value);
        setTest({moods: temp});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.description}>Select Four</Text>
            <SelectMultiple style={styles.selectApi}
                 items={moodDropdown}
                 selectedItems={selectedMoods}
                 onSelectionsChange={handleChange}
                 maxSelect={4}
            />
            <TouchableOpacity
                 onPress={() => navigation.navigate('Statistics', test)}>
                <Text>Done</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        flex: 1,
        fontFamily: 'Avenir'
    },
    description: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'black',
        letterSpacing: 3
    },
    selectApi: {
        fontFamily: 'Avenir',
        letterSpacing: 1
    }
})