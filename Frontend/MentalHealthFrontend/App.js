import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Home'
import AddEntry from './AddEntry'
import ViewEntry from './ViewEntry'
import Statistics from './Statistics'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>{
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddEntry" component={AddEntry}/>
          <Stack.Screen name="ViewEntry" component={ViewEntry}/>
          <Stack.Screen name="Statistics" component={Statistics}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
    
      }</NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
  },
});


