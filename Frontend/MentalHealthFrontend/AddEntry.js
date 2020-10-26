import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, Text, Button} from 'react-native';

export default function AddEntry({navigation}) {
    const [mood, setMood] = React.useState("");
    const handleMoodChange = event => setMood(event.target.value);
    const [currDate, setDate] = useState('');

    useEffect(() => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setDate(month + '-' + date + '-' + year);
    });

    return(
        <View style = {styles.container}>
         <Text style={styles.date}>{currDate} </Text>
            <Text style ={styles.title}>Mood</Text>
          <TextInput style = {styles.input}
                placeholder="Enter Mood"
                placeholderTextColor="Black"
                autoCapitalize="none"   
          />
            <Text style ={styles.title}>Rate Mood</Text>
            <TextInput style = {styles.input}
                placeholder="Enter number"
                placeholderTextColor="Black"
                autoCapitalize="none"   
          />
          <Text style ={styles.title}>Notes</Text>
            <TextInput style = {styles.noteInput}
                placeholder="Enter notes"
                placeholderTextColor="Black"
                autoCapitalize="none"  
          />
          
        </View>
    )
}

const styles = StyleSheet.create({
    date: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        paddingTop: 10,
    },
    title: {
        paddingTop: 10,
        paddingLeft: 10,
        fontsize: 16,
        color: "black"
    },
    input: {
        fontSize: 12,
        margin: 10,
        height: 30,
        borderColor: 'grey',
        borderWidth: 1,
        paddingLeft: 5, 
    }, 
    noteInput: {
        fontSize: 12,
        margin: 10,
        height: 80,
        borderColor: 'grey',
        borderWidth: 1,
        paddingBottom: 50,
        paddingLeft: 5, 
    },
    button: {
        width: 20,
        height: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})