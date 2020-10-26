import React from 'react';
import { View, StyleSheet, TextInput, Text, Button, Dimensions} from 'react-native';
import { LineChart } from "react-native-chart-kit";

  export default function Statistics({navigation}) {
      return (
          <View style={styles.container}>
             
              <Text style={styles.title}> Line Chart Test</Text>
            <LineChart
                    data={{
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                        {
                        data: [5, 6, 9, 8 ],
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
                />
          </View>
    
      )
  }

  const styles = StyleSheet.create({
      container: {
          backgroundColor: "white",
          paddingLeft: 8,
          flex: 1,
      },
      title: {
          fontSize: 20,
      }
  })