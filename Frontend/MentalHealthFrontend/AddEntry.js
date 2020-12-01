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
            });
            setTimeout(() => {
                {
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
            }, 200);
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
            setIsFilledOut(true);
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
        <View style={styles.titleContainer}><Text style={styles.title}>What's on your mind today?</Text></View>
         <View className="entry" style={styles.entriesContainer}>
            <Text style={styles.description}>Select existing moods</Text>
             <View className="moodContainer" style={styles.moodContainer}>
                <Picker style={styles.dropdown} 
                    onValueChange={(itemValue, itemIndex) => {
                        setNameSelect(moodDropdown[itemValue]) }}>
                    <Picker.Item label='Select mood' value='0' />        
                    {Object.keys(moodDropdown).map((key) => {
                    return (
                        <Picker.Item label={moodDropdown[key]} value={key} key={key}/>) 
                    })}
                </Picker>
                <Picker style={styles.scaleDropdown} 
                    onValueChange={(itemValue, itemIndex) => {
                        setScaleSelect(scaleArray[itemValue]) }}>
                    <Picker.Item label='Scale' value='0' />      
                    {Object.keys(scaleArray).map((key) => {
                    return (
                        <Picker.Item label={scaleArray[key]} value={key} key={key}/>) 
                    })}
                </Picker>
                <View style={styles.addContainer}>
                    <TouchableOpacity
                        style={styles.addText}
                        onPress={handleListSelection}>
                            <Text style={styles.buttonText}>Add mood</Text>
                    </TouchableOpacity>
                </View>
             </View>
             <Text style={styles.description}>Input new mood</Text>
             <View className="inputContainer" style={styles.moodContainer}>
                <TextInput style={styles.inputBox}
                    placeholder="Enter mood"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    onChangeText={mood => setNameInput(mood)} />
                <Picker style={styles.scaleDropdown} 
                    onValueChange={(itemValue, itemIndex) => {
                    setScaleInput(scaleArray[itemValue]) }}>
                    <Picker.Item label='Scale' value='0' />      
                    {Object.keys(scaleArray).map((key) => {
                        return (
                            <Picker.Item label={scaleArray[key]} value={key} key={key}/>) 
                     })}
                </Picker>
                <View style={styles.addContainer}>
                    <TouchableOpacity
                        style={styles.addText}
                        onPress={handleListInput}>
                        <Text style={styles.buttonText}>Add mood</Text>
                    </TouchableOpacity>
                </View>
             </View>
         </View>
          
         <View className="listDisplay" style={styles.listDisplay}>
                <FlatList style={styles.flastListStyle} 
                    data={moodList} 
                    numColumns={3}
                    renderItem={({ item, index }) => (
                    <View className="listItemBox" style={styles.listItem}>
                         <Text style={styles.listItem}>{item.name} {item.scale}</Text> 
                         {/* <TouchableOpacity
                            onPress={handleListDelete(index)}>
                             <Text style={{fpaddingLeft: 10, ontWeight: 'bold', color: 'red'}}>x</Text>
                         </TouchableOpacity> */}
                    </View>
                    )}/>
            </View>  

         <View className="note" style={styles.note}>
                <TextInput style={styles.noteInput}
                    placeholder="Notes"
                    editable={true}
                    multiline={true}
                    maxLength={300}
                    selectTextOnFocus={false}
                    onChangeText={text => {
                        setNote(text);
                        setCharacters(text.length);
                        {handleTextChange}
                    }}> 
                 </TextInput>
                 <Text style={styles.description}>{characters}/300</Text>
                    <View className="button"
                        style={styles.buttonContainer}>
                        <TouchableOpacity
                               style={styles.buttonStyle} 
                            onPress={checkNoteInput}>
                                <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
             </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303F5C',
        flexDirection: 'column'
    },
    titleContainer: {
        height: '8%',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    description: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'white',
        letterSpacing: 2
    },
    entriesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '20%',
    },
    moodContainer: {
        flexDirection: 'row', 
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        fontSize: 18,
        margin: 10,
        height: 30, 
        width: 150,
        borderWidth: 1,
        paddingLeft: 5, 
        borderColor: '#F8D287', 
        fontFamily: 'Avenir',
        backgroundColor: '#F8D287',
        borderRadius: 8,
    },
    note: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '50%',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4,
        backgroundColor: '#F8D287',
        alignItems: 'center',
    },
    noteInput: {
        fontSize: 18,
        margin: 10,
        height: 250, 
        width: 325,
        borderWidth: 1,
        margin: 20,
        paddingLeft: 10, 
        borderColor: '#F8D287',
        fontFamily: 'Avenir',
    }, 
    buttonContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        padding: 5,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        backgroundColor: '#A6CDB5',
        height: 40, 
        width: 200,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Avenir'
    },
    addContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
    },
    addText : {
        height: 30, 
        width: 80,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#A6CDB5',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
    },
    dropdown: {
        width: 150,
        height: 30,
        fontSize: 18,
        margin: 10,
        borderRadius: 1,
        borderRadius: 8,
        borderColor: '#F8D287',
        fontFamily: 'Avenir',
        backgroundColor: '#F8D287',        
    },
    scaleDropdown: {
        width: 80,
        height: 30,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 1,
        borderColor: "#F8D287",
        borderRadius: 8,
        fontFamily: 'Avenir',
        backgroundColor: '#F8D287'
    },
   listDisplay: {
        flex: 1,
        fontFamily: 'Avenir',
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: '22%',
   }, 
   listItemBox: {
        height: '100%',
        width: '50%',
   },
   listItem: {
        fontFamily: 'Avenir',
        fontSize: 18,
        color: 'gray',
        paddingLeft: 10,
   }
})