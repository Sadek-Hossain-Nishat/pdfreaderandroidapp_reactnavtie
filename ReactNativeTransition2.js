import React, { useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, PanResponder, Button } from "react-native";


const ReactNativeTransition2 = () => {
  const [vertValue, setVertValue] = useState(0);


  const pan = useRef(new Animated.ValueXY()).current;


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      // onPanResponderMove: Animated.event(
      //   [
      //     null,
      //     { dy: pan.y }
      //   ]
      // ),
      onPanResponderMove: (e, gestureState) => {


        // if (gestureState.dy<0){
        //   pan.y.setValue(0)
        // }
        // else if (gestureState.dy>600){
        //   pan.y.setValue(600)
        // }else {
        //   pan.y.setValue(gestureState.dy)
        //
        // }

        pan.y.setValue(gestureState.dy);


        if (pan.y.__getValue()<=0) {
          setVertValue(0)

        }else if (pan.y.__getValue() >= 600) {
          setVertValue(600);
        } else {
          setVertValue(pan.y.__getValue())
        }
        // setVertValue(pan.y.)
        //
        //
        //
        console.log("y value: ", pan.y.__getValue());




      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      // onPanResponderRelease:(e,gestureState)=>{
      //
      //   pan.y.setValue(gestureState.dy)
      //
      //
      //
      // }
    }),
  ).current;

  const moveDirection = () => {

    pan.y.setValue(pan.y.__getValue()+1)

  }


  return (
    <View style={styles.container}>
      {/*<Text style={styles.titleText}>Drag this box!</Text>*/}
      <Button title={'Drag this box'} onPress={moveDirection} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, {
            translateY: pan.y.interpolate({
              inputRange: [0, 600], outputRange: [0, 600],
              extrapolate:  "clamp",
            }),
          }],
        }}
        {...panResponder.panHandlers}
      >

        <View style={{
          height: 50,
          backgroundColor: "rgba(173, 173, 173, 0.5)",
          // borderRadius: 20,
          borderBottomLeftRadius:20,
          borderTopLeftRadius:20,


          width: 90,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text>{Math.floor(vertValue)}</Text>

        </View>


      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: .1,
    alignItems: "center",
    justifyContent: "center",
    marginTop:20
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    // borderRadius: 5,
    borderBottomLeftRadius:5,
    borderTopLeftRadius:5
  },

  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    height: 500,
    justifyContent: "center",
    alignItems: "stretch",


  },
});
export default ReactNativeTransition2;


/***
 const pan = useRef(new Animated.ValueXY()).current;

 const panResponder = useRef(
 PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: 0,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: 0, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
 ).current;

 return (
 <View style={styles.container}>
 <Text style={styles.titleText}>Drag this box!</Text>
 <Animated.View
 style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
 {...panResponder.panHandlers}
 >
 <View style={styles.box} />
 </Animated.View>
 </View>
 );
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});
 ***/
