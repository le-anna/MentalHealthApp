import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarInfo ({navigation}) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: 'white'
    }
  });
   
