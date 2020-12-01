import React, { useLayoutEffect } from 'react';
import { Alert, StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity} from 'react-native';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
//import logo from './circleTest.png';
import logo from './homeBackground.jpeg'


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
                <View className="imagePortion" style={{height: '60%'}}></View>
                <View className="greetingContainer" style={styles.greetingContainer}>
                    <Text style={styles.text}>Hello, how are you today?</Text>
                </View>
                <View className="buttonContainer" style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.buttonStyle} 
                        onPress={() => navigation.navigate('AddEntry')}>
                            <Text style={styles.buttonText}>Add Entry</Text>
                    </TouchableOpacity>
                </View>

            <View style={styles.barContianer}>
                <TouchableOpacity 
                    style={styles.barButton}
                    title="View Entries"
                    onPress={() => navigation.navigate('ViewEntry')}>
                         <FontAwesomeIcon icon="bars" style={{color: '#404C7E'}}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.barButton}
                    title="View Statistics"
                    onPress={() => navigation.navigate('Statistics')}>
                        <FontAwesomeIcon icon="chart-bar" style={{color: '#404C7E'}}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.barButton}
                    title="Search"
                    onPress={() => navigation.navigate('Search')}>
                        <FontAwesomeIcon icon="search" style={{color: '#404C7E'}}/>
                </TouchableOpacity>
            </View>
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
    greetingContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        height: '15%',
        textAlign: 'center'
    },
    buttonContainer: {
        height: '15%',
        alignItems: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 30,
        fontFamily: 'Avenir',
        letterSpacing: 2,
        padding: 10,
        color: 'black'
    },
    image: {
       height: '100%',
       width: '100%',
       flexDirection: 'column'
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
    barContianer: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 15
    }, 
    barButton: {
        padding: 8,
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
    }
  });

