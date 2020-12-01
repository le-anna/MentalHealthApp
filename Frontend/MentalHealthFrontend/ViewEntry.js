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

                <View className="dropdown" style={styles.dropdownContainer}>
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
                        <FontAwesomeIcon icon="sync" style={{ color: '#A6CDB5' }}/> 
                    </TouchableOpacity>
                
                <View className="entries">
                    {isLoading ? <ActivityIndicator/> : (
                        <FlatList data={data}
                            renderItem={({ item }) => (
                                <View style={styles.entriesContainer}
                                        keyExtractor={item => item.id.toString()}>
                                    <Text style={styles.textStyle}> 
                                        {item.name}{" "}{item.scale} </Text>
                                         <TouchableOpacity style={styles.trashIcon}
                                            onPress={() => {
                                                setDeleteMood(item.id);
                                                setIsMoodDelete(true);
                                                setUrl(`http://localhost:8080/user/1${test}` + `/notes`);}}>
                                            <FontAwesomeIcon icon="trash" style={{ color: '#A6CDB5' }}/>
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
                                            <FontAwesomeIcon icon="trash" style={{ color: '#A6CDB5' }}/>
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
      backgroundColor: '#404C7E',
      padding: 15,
      fontFamily: 'Avenir',
    },
    title : {
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
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
        backgroundColor: '#A6CDB5',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Avenir'
    },
    trashIcon: {
        alignSelf: 'flex-end',
        paddingBottom: 12,
    },
    entriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 5,
        paddingTop: 14, 
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFEC9F',
        borderColor: '#FFEC9F',
        fontFamily: 'Avenir',
    },
    noteContainer: {
        paddingTop: 15,
    },
    note: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        paddingBottom: 10,
        padding: 16,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFEC9F',
        borderColor: '#FFEC9F',
        fontFamily: 'Avenir',
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
        borderColor: '#FFEC9F',
        backgroundColor: '#FFEC9F',
        borderRadius: 8,
        fontFamily: 'Avenir',
    },
});
