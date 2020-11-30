import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './Home'
import AddEntry from './AddEntry'
import ViewEntry from './ViewEntry'
import Statistics from './Statistics'
import Search from './Search'
import MoodSelection from './components/MoodSelection'
import SearchDetail from './components/SearchDetail'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faCalendar, faSearch, faTrash, faChartBar, faCalendarPlus, faSync, faCaretDown} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faBars, faCalendar, faSearch, faTrash, faChartBar, faCalendarPlus, faSync, faCaretDown)

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>{
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home"
            component={Home}
            options={{ 
              title: 'Home', 
              headerTintColor: 'black',
              headerStyle: {
              backgroundColor: '#699125'
              }}}/>
          <Stack.Screen 
            name="AddEntry" 
            component={AddEntry} 
            options={{ 
              title: 'Add Entry', 
              headerTintColor: 'black',
              headerStyle: {
              backgroundColor: '#699125',
              }}}/>
          <Stack.Screen 
            name="ViewEntry" 
            options={{ title: 'View Entry' }}
            component={ViewEntry}
            options={{ 
              title: 'View Entry', 
              headerTintColor: 'black',
              headerStyle: {
              backgroundColor: '#699125'
              }}}/>
          <Stack.Screen 
            name="Statistics" 
              component={Statistics}
              options={{ 
                title: 'Statistics', 
                headerTintColor: 'black',
                headerStyle: {
                backgroundColor: '#699125',
                }}}/>
          <Stack.Screen 
            name="Search" 
            component={Search}
            options={{ 
              title: 'Search', 
              headerTintColor: 'black',
              headerStyle: {
              backgroundColor: '#699125',
              }}}/>
           <Stack.Screen 
              name="SearchDetail" 
              component={SearchDetail}
              options={{ 
                title: 'Search Details', 
                headerTintColor: 'black',
                headerStyle: {
                backgroundColor: '#699125',
                }}}/>
            <Stack.Screen 
              name="Mood Selection" 
              component={MoodSelection}/>
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


