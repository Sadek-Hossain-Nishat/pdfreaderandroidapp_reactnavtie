import React, { useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Slider,  Icon } from '@rneui/themed'
import { Text } from "@rneui/base";

const Reactnativescrollview = () => {
  const [value, setValue] = useState(0);
  const [vertValue, setVertValue] = useState(0);

  const onValueChange=()=>{
    setVertValue(prevState => prevState+1)


  }
  return (
    <View style={styles.verticalContent}>
      <Slider

        value={vertValue}
        onValueChange={setVertValue}
        maximumValue={50}
        minimumValue={20}
        step={1}
        orientation="vertical"

        thumbStyle={{ height: 20, width: 16, backgroundColor: 'transparent',alignItems: 'flex-end'}}
        thumbProps={{
          children: (
            <TouchableNativeFeedback onPress={onValueChange}>

              <View style={{ height: 50,
                backgroundColor: 'rgba(173, 173, 173, 0.5)',
                borderRadius:20,


                width: 90,
                justifyContent: 'center',
                alignItems: 'center',}}>
                <Text >Value: {vertValue}</Text>

              </View>



            </TouchableNativeFeedback>


          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },

  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    height: 500,
    justifyContent: 'center',
    alignItems: 'stretch',






  },
});

export default Reactnativescrollview;
