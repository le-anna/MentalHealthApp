import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button } from 'react-native';
import { useState, useEffect } from "react";
import logo from './circleTest.png';


export default function Home ({navigation}) {
    const [userName, setUserName] = useState([]);
    const [testName, testSetName] = useState([]);

    useEffect(() => {
        fetch('/user/1', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((json) => testSetName(json.name))
        .catch((error) => console.error(error))
    }, []);

    return (
        <View style={styles.container}>  
            <ImageBackground source={logo} style={styles.image}>
            <Text style={styles.text}>
                 Hello
            </Text>
            <TextInput style={styles.text}
                onChangeText={(val) => setUserName(val)}/>
            <Text> name: {userName}</Text>
            <Text> works: {testName.name}</Text>
            <Button 
                title="Add Entry"
                onPress={() => navigation.navigate('AddEntry')}
            />
            <Button 
                title="View Statistics"
                onPress={() => navigation.navigate('Statistics')}
            />
            </ImageBackground>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: 'white'
    },
    text: {
        marginTop:120,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Avenir',
        paddingBottom: 20,
    },
    image: {
        width:300, 
        height:300, 
    }
  });

