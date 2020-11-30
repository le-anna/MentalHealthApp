import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';

export default function SearchDetail ({route, navigation}) {
    const { date } = route.params;
    const [data, setData] = useState([]);
    const [noteData, setNote] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(`http://localhost:8080/${date}` + `/user/1/moods`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async() => {
            const noteResult = await fetch(`http://localhost:8080/user/1/${date}` + `/notes`)
            .then((res) => res.json())
            .then((json) => setNote(json))
            .catch((error) => console.error(error))
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text>{date}</Text>
            <View className="entries" style={styles.itemContainer}>
                <FlatList data={data}
                    renderItem={({ item }) => (
                    <View style={styles.itemObj}
                        keyExtractor={item => item.id.toString()}>
                        <Text style={styles.textStyle}>{item.name}{": "}{item.scale}</Text>
                     </View>
                )}/>
            </View>
            <View className="notes" style={styles.itemContainer}>
                <FlatList data={noteData}
                    renderItem={({ item }) => (
                    <View style={styles.itemObj}
                        keyExtractor={item => item.id.toString()}>
                        <Text style={styles.textStyle}>{item.note}</Text>
                    </View>
                )}/>
             </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        margin: 20,
        padding: 15,
        radius:10, 
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#699125',
    },
    itemContainer: {
        marginBottom: 4,
    },
    itemObj: {
        padding: 16,
        width: 300,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 5
    },
})