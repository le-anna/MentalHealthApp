import React, {useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet, Text, Button, Picker, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart, ContributionGraph, BarChart } from "react-native-chart-kit";

  export default function Statistics({navigation}) {
    const [moodDropdown, setMoodDropdown] = useState([]);
    const [dateDropdown, setDateDropdown] = useState([]);
    const [selection, setSelection] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [submit, setSubmit] = useState('http://localhost:8080/user/1');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [scaleList, setScaleList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [countList, setCountList] = useState([]);

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
        if(isSubmit) {
            const fetchData = async() => {
                const result = await fetch(submit)
                .then((res) => res.json())
                .then((json) => {
                    var scales = json.map(item => item.scale);
                    setScaleList([...scales]);
                    var dates = json.map(item => item.entry.date);
                    setDateList([...dates]);
                    console.log(dates);
                })
                 .catch((error) => console.error(error))
                .finally(() => setIsLoading(false));
            };
            fetchData();
        }
        const fetchCount = async() => {
            const result = await fetch(`http://localhost:8080/user/1/count`)
            .then((res) => res.json())
            .then((json) => {
                var count = json;
                setCountList([...count]);
            })
        };
        fetchCount();
    }, [submit]);


      return (
          <View style={styles.container}>
              <Text style={styles.title}>Statistics</Text>
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
                <View className="dates" style={styles.datesContainer}>
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
                            setSubmit(`http://localhost:8080/user/1/search/` + `${selection}` + `/${startDate}` + `/${endDate}`);
                            setIsSubmit(true); }}>
                            <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>    
              </View>
             
  

              <Text style={styles.title}> Line Chart</Text>
              <ScrollView horizontal={true}>
              <LineChart
                    data={{
                        labels: dateList,
                        datasets: [ { data: scaleList } ]
                    }}
                    //width={Dimensions.get("window").width}
                    height={250}
                    width={350}
                    chartConfig={{
                        backgroundColor: 'rgba(134, 65, 244, ${opacity})',
                        backgroundGradientFrom: "#91B06B ",
                        backgroundGradientTo: "#91B06B ",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        decimalPlaces: 0,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "white"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
              </ScrollView>

              <BarChart
                data={{
                    labels: moodDropdown,
                    datasets: [ { data: countList } ],
                }}
                //width={Dimensions.get('window').width - 16}
                width={500}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    decimalPlaces: 0,
                    style: {
                    borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />

             

                
          </View>
    
      )
  }

  const styles = StyleSheet.create({
      container: {
          backgroundColor: "white",
          padding: 15,
          flex: 1,
          alignItems: 'center',
          fontFamily: 'Avenir'
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold'
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
    datesContainer: {
        flexDirection: 'row'
    },
    buttonContainer : {
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
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