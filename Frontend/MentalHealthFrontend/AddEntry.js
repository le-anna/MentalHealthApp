import React, {useState, useEffect} from 'react';
import {Alert, View, StyleSheet, TextInput, Text, TouchableOpacity,Button} from 'react-native';
import moment from 'moment';
import MoodItem from './components/MoodItem';
import { Picker } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

export default function AddEntry({navigation}) {
    const [nameInput, setNameInput] = React.useState("");
    const [scaleInput, setScaleInput] = React.useState("");
    const [nameSelect, setNameSelect] = React.useState("");
    const [scaleSelect, setScaleSelect] = React.useState("");
    const [characters, setCharacters] = useState('');
    const [note, setNote] = useState("");
    const [currDate, setDate] = useState('');
    const [moodDropdown, setMoodDropdown] = useState([]);
    var scaleArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [moodList, setMoodList] = useState([]);
    const [isFilledOut, setIsFilledOut] = useState(false);


    useEffect(() => { 
        setDate(moment().format("YYYY-MM-DD"));
    });

    useEffect(() => {
        fetch(`http://localhost:8080/user/1/moods/filter`)
        .then((response) => response.json())
        .then((json) => setMoodDropdown(json))
        .catch((error) => console.error(error))   
    }, []) 

    useEffect(() => {
        if(isFilledOut) {
            fetch('http://localhost:8080/user/1/entry/' + currDate + `/moods`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(moodList)
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
    }, [isFilledOut]) 


    function handleTextChange () {
        const count = 100;
        count = count - characters;
        setCharacters(count);
    }

    function handleListSelection() {
        setMoodList(oldList => [...oldList, {name: nameSelect, scale: scaleSelect}]);
    }

    function handleListInput() {
        setMoodList(oldList => [...oldList, {name: nameInput, scale: scaleInput}]);  
    }
    
    function checkNoteInput() {
        if(characters > 0) {
            alert("Submitted!");
            setIsFilledOut(true);
        } else {
            alert("Please enter note input.");
        }
    }

    //   function handleListDelete (num) {
    //     const temp = [...moodList];
    //     const newList = temp.splice(num); 
    //     setMoodList(newList);
    //   }

    const openAlert=()=>{
        alert("Successfully submitted");
      }

    return(
        <View style={styles.container}>
         <Text style={styles.date}>{moment().format('ll')} </Text>
         <Text>Select from existing moods: </Text>
         <View className="entryFields">
             <View className="dropdownContainer" style={styles.dropdownContainer}>
                <Picker style={styles.dropdown} 
                    onValueChange={(itemValue, itemIndex) => {
                        setNameSelect(moodDropdown[itemValue]) }}>
                    <Picker.Item label='Select mood' value='0' />        
                    {Object.keys(moodDropdown).map((key) => {
                    return (
                        <Picker.Item label={moodDropdown[key]} value={key} key={key}/>) 
                    })}
                </Picker>
                <Picker style={styles.dropdown} 
                    onValueChange={(itemValue, itemIndex) => {
                        setScaleSelect(scaleArray[itemValue]) }}>
                    <Picker.Item label='Select scale' value='0' />      
                    {Object.keys(scaleArray).map((key) => {
                    return (
                        <Picker.Item label={scaleArray[key]} value={key} key={key}/>) 
                    })}
                </Picker>
                <View style={styles.addContainer}>
                    <TouchableOpacity
                        style={styles.addText}
                        onPress={handleListSelection}>
                            <Text style={styles.buttonText}> + </Text>
                    </TouchableOpacity>
                </View>
    
             </View>
           
             <Text style={{textAlign: 'center'}}>Input new mood: </Text>
             <View className="inputContainer" style={styles.inputContainer}>
                <TextInput style = {styles.inputBox}
                    placeholder="Enter Mood"
                    placeholderTextColor="Black"
                    autoCapitalize="none"
                    onChangeText={mood => setNameInput(mood)} />
                <Picker style={styles.dropdown} 
                    onValueChange={(itemValue, itemIndex) => {
                    setScaleInput(scaleArray[itemValue]) }}>
                    <Picker.Item label='Select scale' value='0' />      
                    {Object.keys(scaleArray).map((key) => {
                        return (
                            <Picker.Item label={scaleArray[key]} value={key} key={key}/>) 
                     })}
                </Picker>
                <View style={styles.addContainer}>
                    <TouchableOpacity
                        style={styles.addText}
                        onPress={handleListInput}>
                        <Text style={styles.buttonText}> + </Text>
                    </TouchableOpacity>
                </View>
             </View>

             <View className="displayListContainer" style={styles.listDisplay}>
                <FlatList 
                    data={moodList}
                    renderItem={({ item, index }) => (
                    <View className="displayItem" style={{flexDirection: "row"}}>
                         <Text style={{fontSize: 18, color: 'grey'}}>  {item.name} {item.scale} </Text> 
                         {/* <TouchableOpacity
                            onPress={handleListDelete(index)}>
                             <Text style={{fpaddingLeft: 10, ontWeight: 'bold', color: 'red'}}>x</Text>
                         </TouchableOpacity> */}
                    </View>

                    )}
                 />
        
            </View>
        
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
            <Text style={{paddingLeft: 12}}>{characters}/300</Text>
         </View>

         <View className="button"
            style={styles.buttonContainer}>
            <TouchableOpacity
                    style={styles.buttonStyle} 
                    onPress={checkNoteInput}>
                        <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            {/* <Button title='1 button alert' onPress={openAlert}/> */}
            {/* <MoodItem/> */}

         </View>

          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        alignItems: 'center',
 
    },
    date: {
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row', 
        alignContent: 'center',
    },
    inputBox: {
        fontSize: 18,
        margin: 10,
        height: 30, width: 150,
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
    addContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
    },
    addText : {
        height: 20, width: 20,
        backgroundColor: "#699125",
        textAlign: 'center',
        borderRadius: 50,
    }, 
    dropdownContainer: {
        flexDirection: 'row', 
        alignContent: 'center',
    },
    dropdown: {
        width: 150,
        height: 30,
        fontSize: 18,
        paddingLeft: 10,
        margin: 10,
        borderRadius: 1,
        borderColor: "#C0C0C0",
        borderRadius: 8
    },
   listDisplay: {
       flexDirection: "row",
       display: 'flex',
       paddingLeft: 10,
       marginBottom: 4,
   }
})