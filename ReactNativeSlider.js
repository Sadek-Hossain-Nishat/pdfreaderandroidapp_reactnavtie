import React, { useState } from "react";
import { StyleSheet,View } from "react-native";
import RnVerticalSlider from 'rn-vertical-slider';




const ReactNativeSlider = () => {

  const [value, setValue] = useState(5);
  return (
    <View style={styles.container}>
      <RnVerticalSlider

        value={value}
        disabled={false}
        min={0}
        max={100}
        onChange={(value: number) => {
          console.log('CHANGE', value);
          setValue(value)
        }}
        onComplete={(value: number) => {
          console.log('COMPLETE', value);
        }}
        width={50}
        height={300}
        step={1}
        borderRadius={5}
        minimumTrackTintColor={'gray'}
        maximumTrackTintColor={'tomato'}
        showBallIndicator
        ballIndicatorColor={'gray'}
        ballIndicatorTextColor={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReactNativeSlider;
