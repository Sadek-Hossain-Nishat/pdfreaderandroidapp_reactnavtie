import React from "react";
import ToolbarAndroid from '@react-native-community/toolbar-android';
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const ToolbarReactNative = () => {
  return (

    <View style={styles.container}>

      <Icon name="home" size={30} color="blue" />

      <Text>TopBar</Text>
      <Text>Right</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default ToolbarReactNative;



