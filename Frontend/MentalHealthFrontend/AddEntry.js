import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

export default function AddEntry({navigation}) {
    const [moodName, setMoodName] = React.useState("");
    const [scale, setScale] = React.useState("");
    const handleMoodChange = event => setMood(event.target.value);
    const [currDate, setDate] = useState('');
    const [clicked, setClicked] = useState(false);
    const [added, setAdded] = useState(false);
    const [submit, setSubmit] = useState('');

    useEffect(() => {
        setDate(moment().format("YYYY-MM-DD"));
    });

    useEffect(() => {
        if(added == true) {
            fetch('http://localhost:8080/user/1/entry', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: currDate,
                })
            })
        }
    }, [added]) 

    useEffect(() => {
        if(clicked == true) {
            fetch(`http://localhost:8080/user/1/entry/` + currDate + `/mood`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: moodName,
                    scale: scale
                })
            })
        }
    }, [clicked]) 

    return(
        <View style={styles.container}>
         <Text style={styles.date}>{currDate} </Text>
         <View className="entryFields">
            <TextInput style = {styles.input}
                placeholder="Enter Mood"
                placeholderTextColor="Black"
                autoCapitalize="none"  
                onChangeText={name => setMoodName(name)} 
            />
            <TextInput style = {styles.input}
                placeholder="Rate Mood"
                placeholderTextColor="Black"
                autoCapitalize="none"   
                onChangeText={num => setScale(num)}
            />
            <TouchableOpacity
                style={styles.addElements}
                onPress={() => setAdded(true)}>
                    <Text style={styles.buttonText}> + </Text>
            </TouchableOpacity>
         </View>
         <View className="button"
            style={styles.buttonContainer}>
            <TouchableOpacity
                    style={styles.buttonStyle} 
                    onPress={() => setClicked(true)}>
                        <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
         </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white'
    },
    date: {
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
        paddingTop: 10,
        fontWeight: 'bold'
    },
    title: {
        paddingTop: 10,
        paddingLeft: 10,
        fontsize: 16,
        color: "black",
    },
    input: {
        fontSize: 18,
        margin: 10,
        height: 30,
        width: 325,
        borderColor: 'grey',
        borderWidth: 1,
        paddingLeft: 5, 
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#C0C0C0',
        borderTopColor: 'white',
    }, 
    buttonContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: 15,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        height: 40,
        width: 200,
        backgroundColor: "#6495ED",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 0,
    },
    addElements : {
        height: 20,
        width: 20,
        backgroundColor: "#6495ED",
        textAlign: 'center',
        marginLeft: 10,
        borderRadius: 50,
    }
})