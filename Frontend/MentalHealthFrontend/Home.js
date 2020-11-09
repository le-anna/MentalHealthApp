import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity} from 'react-native';
import { useState, useEffect } from "react";
import logo from './circleTest.png';


export default function Home ({navigation}) {
    const [username, setUserName] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/user/1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((json) => setUserName(json.name))
        .catch((error) => console.error(error))
    }, []);

    

    return (
        <View style={styles.container}>  
            <ImageBackground source={logo} style={styles.image}>
            <Text style={styles.text}>
                 Hello, {""} 
                 {username}
            </Text>
            <TouchableOpacity 
                style={styles.buttonStyle} 
                title="Add Entry"
                onPress={() => navigation.navigate('AddEntry')}>
                     <Text>Add Entry</Text>
            </TouchableOpacity>

             <TouchableOpacity 
                title="View Entries"
                onPress={() => navigation.navigate('ViewEntry')}>
                    <Text>View Entries</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                title="CalendarInfo"
                onPress={() => navigation.navigate('CalendarInfo')}>
                    <Text>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                title="View Statistics"
                onPress={() => navigation.navigate('Statistics')}>
                    <Text>Statistics</Text>
            </TouchableOpacity>
            </ImageBackground>
            
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: 'white',
    },
    text: {
        marginTop: 120,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Avenir',
        paddingBottom: 20,
    },
    image: {
        width:300, 
        height:300, 
    },
    buttonStyle: {
        marginLeft: 100,
        paddingTop: 20,
        paddingBottom: 50,
        textAlign: 'center',
        width: 100,
        backgroundColor: "transparent",
    }
  });

