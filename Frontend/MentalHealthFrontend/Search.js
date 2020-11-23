import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import "react-datepicker/dist/react-datepicker.css";

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
        setUrl(`http://localhost:8080/searchNotes/${search}`);

      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [search])



  return (
   <View style={styles.container}>
      <Text style={styles.title}>Search{"\n"}</Text>
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
                  <View style={styles.entriesContainer}
                    keyExtractor={item => item.id.toString()}>
                    <Text style={styles.textStyle}> {item.note} </Text>
                  </View>
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
      backgroundColor: 'white',
      padding: 15,
    },
    title : {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
      padding: 15,
  },
    searchContainer : {
      alignItems: 'center',
      justifyContent: 'center', 
  },
    inputStyle: {
      fontSize: 18,
      width: 325,
      height: 45,
      backgroundColor: '#F5F5F5',
      borderRadius: 5,
      color: 'black',
      paddingLeft: 5,
  },
entriesContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  display: 'flex',
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 5,
  paddingTop: 14,
  borderTopColor: 'white',
  borderLeftColor: 'white',
  borderRightColor: 'white',
  borderBottomColor: '#bbb',    
  borderWidth: 1,
  borderStyle: 'dashed',
  borderRadius: 5,
  marginBottom: 4,
},
textStyle: {
  fontSize: 18,
  paddingBottom: 10,
},
  });
   
