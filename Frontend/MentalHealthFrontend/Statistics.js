import { setStatusBarStyle } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, Text, Button, Dimensions, Picker, TouchableOpacity} from 'react-native';
import { LineChart } from "react-native-chart-kit";

  export default function Statistics({navigation}) {
    const [moodDropdown, setMoodDropdown] = useState([]);
    const [dateDropdown, setDateDropdown] = useState([]);
    const [selection, setSelection] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [submit, setSubmit] = useState('http://localhost:8080/user/1');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/user/1/moods/filter`)
        .then((response) => response.json())
        .then((json) => setMoodDropdown(json))
        .catch((error) => console.error(error))   
    }, []) 

    useEffect(() => {
        fetch(`http://localhost:8080/user/1/entries/filter`)
        .then((response) => response.json())
        .then((json) => setDateDropdown(json))
        .catch((error) => console.error(error))   
    }, []) 


    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(submit)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
        };
        fetchData();
    }, [submit]);


      return (
          <View style={styles.container}>

              <View>
                <Picker style={styles.dropdown} 
                        onValueChange={(itemValue, itemIndex) => {
                            setSelection(moodDropdown[itemValue]) }}>
                        <Picker.Item label='Select Mood' value='0' />        
                        {Object.keys(moodDropdown).map((key) => {
                        return (
                            <Picker.Item label={moodDropdown[key]} value={key} key={key}/>) 
                        })}
                </Picker>
                <View className="dates">
                    <Picker style={styles.dropdown} 
                            onValueChange={(itemValue, itemIndex) => {
                                setStartDate(dateDropdown[itemValue]) }}>
                            <Picker.Item label='Start Date' value='0' />        
                            {Object.keys(dateDropdown).map((key) => {
                            return (
                                <Picker.Item label={dateDropdown[key]} value={key} key={key}/>) 
                            })}
                    </Picker>
                    <Picker style={styles.dropdown} 
                            onValueChange={(itemValue, itemIndex) => {
                                setEndDate(dateDropdown[itemValue]) }}>
                            <Picker.Item label='End Date' value='0' />        
                            {Object.keys(dateDropdown).map((key) => {
                            return (
                                <Picker.Item label={dateDropdown[key]} value={key} key={key}/>) 
                            })}
                    </Picker>
                </View>

                <View style={styles.buttonContainer}>   
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress={() => {
                            setSubmit(`http://localhost:8080/user/1/search/` + `${selection}` + `/${startDate}` + `/${endDate}`) }}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <Text>{selection}</Text>
                    <Text>{startDate}</Text>x
                    <Text>{endDate}</Text>
                </View>


            
              </View>
             
              {/* <Text style={styles.title}> Line Chart Test</Text>
                 <LineChart
                    data={{
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                        {
                        data: [5, 10, 9, 8 ],
                        }
                    ]
                    }}
                    width={360} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: 'rgba(134, 65, 244, ${opacity})',
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                /> */}
          </View>
    
      )
  }

  const styles = StyleSheet.create({
      container: {
          backgroundColor: "white",
          paddingLeft: 8,
          flex: 1,
          alignItems: 'center',
      },
      title: {
          fontSize: 20,
      },
      dropdownContainer: {
        flexDirection: 'row', 
        alignContent: 'center',
    },
    dropdown: {
        width: 150,
        height: 30,
        fontSize: 18,
        paddingLeft: 10,
        margin: 10,
        borderRadius: 1,
        borderColor: "#C0C0C0"
    },
    buttonContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: 15,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        height: 40, width: 200,
        backgroundColor: "#699125",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 0,
    },
  })