import React, { useLayoutEffect } from 'react';
import { Alert, StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity} from 'react-native';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import logo from './circleTest.png';


export default function Home ({navigation}) {
    const [username, setUserName] = useState([]);

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
                onPress={() => navigation.navigate('AddEntry')}>
                     <Text style={styles.buttonText}>Add Entry</Text>
            </TouchableOpacity>
            </ImageBackground>

            <View style={styles.barContianer}>
                <TouchableOpacity 
                    style={styles.barButton}
                    title="View Entries"
                    onPress={() => navigation.navigate('ViewEntry')}>
                         <FontAwesomeIcon icon="bars" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.barButton}
                    title="View Statistics"
                    onPress={() => navigation.navigate('Statistics')}>
                        <FontAwesomeIcon icon="chart-bar" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.barButton}
                    title="Search"
                    onPress={() => navigation.navigate('Search')}>
                        <FontAwesomeIcon icon="search" />
                </TouchableOpacity>
            </View>
        
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
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'center',
        width: 100,
        backgroundColor: "#699125",
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    barContianer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
    }, 
    barButton: {
        padding: 8,
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,

    }
  });

