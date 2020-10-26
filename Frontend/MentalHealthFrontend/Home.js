import React from 'react';
import { StyleSheet, Text, View, fontFamily, ImageBackground, Button } from 'react-native';
import { useState } from "react";
import logo from './circleTest.png';


export default function Home ({navigation}) {
    return (
        <View style={styles.container}>  
            <ImageBackground source={logo} style={styles.image}>
            <Text style={styles.text}>Hello, Name!</Text>
            <Button 
                title="Add Entry"
                style={{backgroundColor: '#00000000', fontFamily: 'Avenir', width: 20, height: 50, alignSelf: 'center'}}
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
const HomeText = () =>{

    {titleText}
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

