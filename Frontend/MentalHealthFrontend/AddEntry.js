import React, {useState, useEffect} from 'react';
import {Alert, View, StyleSheet, TextInput, Text, TouchableOpacity,Button} from 'react-native';
import moment from 'moment';
import MoodItem from './components/MoodItem';
import { Picker } from 'react-native'

export default function AddEntry({navigation}) {
    const [moodName, setMoodName] = React.useState("");
    const [scale, setScale] = React.useState("");
    const handleMoodChange = event => setMood(event.target.value);
    const [characters, setCharacters] = useState('');
    const [note, setNote] = useState("");
    const [currDate, setDate] = useState('');
    const [clicked, setClicked] = useState(false);
    const [added, setAdded] = useState(false);
    // const [list, setList] = useState(initialList);

    // //when user enters first mood, update first default element of list
    // const initialList = [
    //     {
    //         name: 'default',
    //         scale: '10'
    //     }
    // ]

    // function handleChange() {
    //     // track input field's state
    //   }
     
    //   function handleAdd() {
    //     // add item
    //   }

    useEffect(() => {
        setDate(moment().format("YYYY-MM-DD"));
    });

    // useEffect(() => {
    //     if(added) {
    //         fetch('http://localhost:8080/user/1/entry', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 date: currDate,
    //             })
    //         })
    //     }
    // }, [added]) 


    useEffect(() => {
        if(clicked) {
            fetch('http://localhost:8080/user/1/entry/' + currDate + `/mood`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: moodName,
                    scale: scale
                })
            }),
            fetch('http://localhost:8080/entry/' + currDate + `/note`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    note: note
                })
            })
        }
    }, [clicked]) 

    // useEffect(() => {
    //     if(clicked) {
    //         fetch(`http://localhost:8080/user/1/entry/` + currDate + `/mood`, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: moodName,
    //                 scale: scale
    //             })
    //         })
    //         setClicked(false);
    //     }
    // }, [clicked]) 

    function handleTextChange () {
        const count = 100;
        count = count - characters;
        setCharacters(count);
    }

    // useEffect(() => {
    //     if(clicked == true) {
    //         fetch(`http://localhost:8080/user/1/entry/` + currDate + `/moods`, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: moodName,
    //                 scale: scale
    //             })
    //         })
    //     }
    // }, [clicked]) 

    const openAlert=()=>{
        alert("Successfully submitted");
      }

    return(
        <View style={styles.container}>
         <Text style={styles.date}>{moment().format('MMMM Do, YYYY')} </Text>
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
            <TextInput style={styles.noteInput}
                placeholder="Notes"
                editable={true}
                multiline={true}
                maxLength={300}
                onChangeText={text => {
                    setNote(text);
                    setCharacters(text.length);
                    {handleTextChange}
                }}> 
            </TextInput>
            <Text>{characters}/300</Text>
         </View>
         <View className="button"
            style={styles.buttonContainer}>
            <TouchableOpacity
                    style={styles.buttonStyle} 
                    onPress={() => {
                        {openAlert}
                        setClicked(true);
                        //navigation.navigate('Home');
                        <Text>Saved Successfully!</Text>
                    }}>
                        <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            {/* <Button title='1 button alert' onPress={openAlert}/> */}
            {/* <MoodItem/> */}

            <Picker style={styles.dropdown} >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>

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
        height: 30, width: 325,
        borderColor: 'grey',
        borderWidth: 1,
        paddingLeft: 5, 
        borderLeftColor: 'white', 
        borderRightColor: 'white', 
        borderBottomColor: '#C0C0C0', 
        borderTopColor: 'white',
    }, 
    noteInput: {
        flexDirection: 'row-reverse',
        fontSize: 18,
        margin: 10,
        height: 250, width: 325,
        borderColor: 'grey', borderWidth: 1,
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
        height: 40, width: 200,
        backgroundColor: "#699125",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 0,
    },
    addElements : {
        height: 20, width: 20,
        backgroundColor: "#699125",
        textAlign: 'center',
        marginLeft: 10,
        borderRadius: 50,
    }, 
    dropdown: {

    }
})