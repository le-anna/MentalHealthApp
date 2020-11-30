import React, {useState, useEffect, useReducer} from 'react';
import { View, StyleSheet, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity, Picker} from 'react-native';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-native-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import moment from 'moment';

export default function ViewEntry ({navigation}) {
    const [data, setData] = useState([]);
    const [noteData, setNote] = useState([]);
    const [test, setTest] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isNoteLoading, setNoteIsLoading] = useState(true);
    const [url, setUrl] = useState('http://localhost:8080/user/1')
    const [noteUrl, setNoteUrl] = useState('http://localhost:8080/user/1')
    const [isMoodDelete, setIsMoodDelete] = useState(false);
    const [deleteMood, setDeleteMood] = useState('');
    const [isNoteDelete, setIsNoteDelete] = useState(false);
    const [deleteNote, setDeleteNote] = useState('');
    const [dateDropdown, setDateDropdown] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:8080/user/1/entries/filter`)
        .then((response) => response.json())
        .then((json) => setDateDropdown(json))
        .catch((error) => console.error(error))   
      }, []) 

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
        };
        fetchData();
    }, [url]);

    useEffect(() => {
        const fetchData = async() => {
            const noteResult = await fetch(noteUrl)
            .then((res) => res.json())
            .then((json) => setNote(json))
            .catch((error) => console.error(error))
            .finally(() => setNoteIsLoading(false));
        };
        fetchData();
    }, [noteUrl]);

    useEffect(() => {
        if(isMoodDelete) {
            fetch(`http://localhost:8080/deleteMood/${deleteMood}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
           setIsMoodDelete(false);
        }
    }, [deleteMood]); 

    useEffect(() => {
        if(isNoteDelete) {
            fetch(`http://localhost:8080/deleteNote/${deleteNote}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
           setIsNoteDelete(false);
        }
    }, [deleteNote]); 
    
        return (
            <View 
                style={styles.container}>
                <Text style={styles.title}>Search{"\n"}</Text>

                <View className="dates" style={styles.datesContainer}>
                    <Picker style={styles.dropdown} 
                        onValueChange={(itemValue, itemIndex) => {
                             setTest(dateDropdown[itemValue]) }}>
                        <Picker.Item label='Find By Date' value='0' />        
                            {Object.keys(dateDropdown).map((key) => {
                            return (
                                <Picker.Item label={moment(dateDropdown[key]).format('MMM D, YYYY')} value={key} key={key}/>) 
                         })}
                    </Picker>
                </View>
                
                <View style={styles.buttonContainer}>   
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress={() => {
                            setUrl(`http://localhost:8080/${test}` + `/user/1/moods`);
                            setNoteUrl(`http://localhost:8080/user/1/${test}` + `/notes`)}}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
            
                </View>


                    <TouchableOpacity style={styles.reloadIcon}
                        onPress={() => {
                            setUrl(`http://localhost:8080/${test}` + `/user/1/moods`);
                        }}> 
                        <FontAwesomeIcon icon="sync" /> 
                    </TouchableOpacity>
                
                <View className="entries">
                    {isLoading ? <ActivityIndicator/> : (
                        <FlatList data={data}
                            renderItem={({ item }) => (
                                <View style={styles.entriesContainer}
                                        keyExtractor={item => item.id.toString()}>
                                    <Text style={styles.textStyle}> 
                                        {item.name} {": "} {item.scale} </Text>
                                         <TouchableOpacity style={styles.trashIcon}
                                            onPress={() => {
                                                setDeleteMood(item.id);
                                                setIsMoodDelete(true);
                                                setUrl(`http://localhost:8080/user/1${test}` + `/notes`);}}>
                                            <FontAwesomeIcon icon="trash" />
                                        </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>
                <View className="notes" style={styles.noteContainer}>
                        {isNoteLoading ? <ActivityIndicator/> : (
                        <FlatList data={noteData}
                            renderItem={({ item }) => (
                            <View style={styles.note}
                                keyExtractor={item => item.id.toString()}>
                                    <Text style={styles.textStyle}> {item.note}</Text>
                                        <TouchableOpacity style={styles.trashIcon}
                                             onPress={() => {
                                                setDeleteNote(item.id);
                                                setIsNoteDelete(true);
                                                setUrl(`http://localhost:8080/user/1`);
                                            }} >
                                            <FontAwesomeIcon icon="trash" />
                                        </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>
            
            </View>
        )

    
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: 'white',
      padding: 15,
      fontFamily: 'Avenir',
    },
    title : {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 20,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        height: 40,
        width: 200,
        backgroundColor: "#699125",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 0,
    },
    trashIcon: {
        alignSelf: 'flex-end',
        paddingBottom: 12,
    },
    entriesContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        display: 'flex',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 5,
        paddingTop: 14,
        borderColor: '#bbb',    
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 5,
        marginBottom: 4,
    },
    noteContainer: {
        paddingTop: 20,
        marginBottom: 4,
    },
    note: {
        flexDirection: "row",
        justifyContent: 'space-between',
        display: 'flex',
        paddingBottom: 10,
        padding: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 5
    },
    reloadIcon : {
        alignSelf: 'flex-end',
        paddingRight: 5,
        paddingBottom: 20,
    },
    dropdownContainer: {
        alignItems: 'center',
    },
    dropdown: {
        width: 300,
        height: 40,
        fontSize: 18,
        paddingLeft: 10,
        margin: 10,
        borderRadius: 1,
        borderColor: "#C0C0C0",
        borderRadius: 8,
    },
});
