import React, {useState, useEffect, useReducer} from 'react';
import { View, StyleSheet, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { render } from 'react-dom';

export default function ViewEntry ({navigation}) {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [datePath, setDatePath] = useState('');
    const [test, setTest] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState('http://localhost:8080/user/1')

    // useEffect(() => {
    //     async function fetchData() {
    //         const result = await fetch(`http://localhost:8080/${submit}` + `/user/1/moods`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((json) => setData(json))
    //     .catch((error) => console.error(error))
    //     }  
    // }, [submit]);

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(url).then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
            //setData(result);
        };
        fetchData();
    }, [url]);

    // function handleClick(date) {
    //     setStartDate(date);
    //     setDatePath(moment(startDate).format('yyyy-MM-DD'));
    //     console.log('Hello');
    //     console.log(datePath);
    // }

    //onChange={date => setStartDate(date)}
    
        return (
            <View 
                style={styles.container}>
                <Text style={styles.title}>Search{"\n"}</Text>
                <View className="search"
                    style={styles.searchContainer}>
                    <Text style={styles.textStyle}>Enter Date:</Text>
                    <TextInput
                        placeholder={"YYYY-MM-DD"}
                        style={styles.inputStyle}
                        value = {test}
                        onChangeText={text => setTest(text)}> 
                    </TextInput>
                </View>
                <View className="entries"
                    style={styles.entries}>
                {/* <div className="calendar">
                    <Text style={styles.date}>Choose Date to View: {""}</Text>
                    <DatePicker 
                        dateFormat="yyyy-MM-dd"
                        selected={startDate} 
                        onChange={handleClick} />
                        <h1>{moment(startDate).format('yyyy-MM-DD')}</h1>
                </div>
                 */}
                    {isLoading ? <ActivityIndicator/> : (
                        <FlatList
                            data={data}
                            keyExtractor={({ id }, index) => id}
                            renderItem={({ item }) => (
                                <Text 
                                style={styles.textStyle}>
                                    {item.name} {": "}
                                    {item.scale}</Text>

                            )}
                        />
                    )}
                </View>
                <View style={styles.buttonContainer}>   
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress={() => setUrl(`http://localhost:8080/${test}` + `/user/1/moods`)}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: 'white',
      padding: 15,
      fontFamily: 'Avenir'
    },
    searchContainer : {
        alignItems: 'left',
        justifyContent: 'left',
        paddingLeft: 10,
    },
    buttonContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: 15,
    },
    textStyle: {
        fontSize: 18,
        paddingBottom: 10,
    },
    inputStyle: {
        fontSize: 18,
        width: 325,
        height: 45,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        color: 'grey',
        paddingLeft: 5,
    },
    title : {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        height: 40,
        width: 200,
        backgroundColor: "#6495ED",
        padding: 10,
        borderRadius: 5,

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 0,
    },
    entries: {
        paddingTop: 15,
        paddingLeft: 10,
        fontsize: 18
    }
});
