import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';

import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';

export default function CalendarInfo ({navigation}) {
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState(`http://localhost:8080/user/1`);
  const [results, setResults] = useState([]);
  const [characterCount, setCharacterCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async() => {
        const result = await fetch(url)
        .then((res) => res.json())
        .then((json) => setResults(json))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    };
    fetchData();
}, [url]);


  useEffect(() => {
    if (characterCount > 0) {
      const timeout = setTimeout(() => { 
        setUrl(`http://localhost:8080/user/1/search/notes/${search}`);

      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [search])


  return (
   <View style={styles.container}>
      <Text style={styles.title}>Search Notes{"\n"}</Text>
        <View className="search" style={styles.searchContainer}>
            <TextInput style={styles.inputStyle}
              placeholder={"Enter a keyword"}
              onChangeText={word => {
                setSearch(word);
                setCharacterCount(word.length);
              }}> 
           </TextInput>
        </View>   

         <View className="results">
            {isLoading ? <ActivityIndicator/> : (
               <FlatList data={results}
                  renderItem={({ item }) => (
                  <TouchableOpacity style={styles.entriesContainer}
                    keyExtractor={item => item.id.toString()}
                    onPress={() => navigation.push('SearchDetail', item.entry)}>
                    <Text style={styles.textStyle}>{item.note}{"\n"}</Text>
                    <Text style={styles.noteDate}>{moment(item.entry.date).format('MMM D')}</Text>
                  </TouchableOpacity>
                )}/>
              )}
          </View>    
   </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      backgroundColor: '#303F5C',
      padding: 15,
    },
    title : {
      fontFamily: 'Avenir',
      textAlign: 'center',
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold',
  },
    searchContainer : {
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 15,
  },
    inputStyle: {
      fontSize: 18,
      width: 325,
      height: 45,
      backgroundColor: '#F8D287',
      borderRadius: 5,
      color: 'black',
      paddingLeft: 5,
      fontFamily: 'Avenir',
  },
    entriesContainer: {
      flexDirection: 'row',
      justifyZContent: 'space-between',
      display: 'flex',
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 5,
      paddingTop: 14,   
      borderRadius: 5,
      marginBottom: 4,
      backgroundColor: '#F8D287',
      borderColor: '#F8D287',
      fontFamily: 'Avenir',
    },
    textStyle: {
      paddingBottom: 10,
      fontFamily: 'Avenir',
    },
    noteDate: {
      fontSize: 14,
      color: 'gray',
      paddingLeft: 5,
      fontFamily: 'Avenir',
    }
  });
   
