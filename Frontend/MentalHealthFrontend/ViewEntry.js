import React, {useState, useEffect, useReducer} from 'react';
import { View, StyleSheet, TextInput, Text, FlatList} from 'react-native';

export default function ViewEntry ({navigation}) {
    const [data, setData] = useState([]);
    const [moods, setMoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/user/1/moods', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
    }, []);

    return (
        <View 
            style={styles.container}>
            <div>
                {data.map((item, index) => {
                    return (
                        <div key={index}> 
                            <li>{item.entry.date}</li>
                            <li>{item.name}</li>
                            <li>{item.scale}</li>
                        </div>
                    )
                })}
            </div>
        </View>
    )

}


const styles = StyleSheet.create({
    container: { 
      flex: 1,
      alignItems: 'left',
      justifyContent: 'left', 
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingTop: 10,
    },
    text: {
        fontFamily: 'Avenir',
    }
});