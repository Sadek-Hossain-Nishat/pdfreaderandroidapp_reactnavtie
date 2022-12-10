import React from "react";
import { Image, Text, View } from "react-native";

const SplashScreen = () => {

  return (
    <View style={{alignItems:'center',justifyContent:'center',
    height:'100%',width:'100%'}}>
      <Image style={{height:100,width:100}} source={require('./appimages/pdflogo.png')}/>
      <Text style={{fontSize:20,color:'green'}}>
        SHN PDF READER
      </Text>

    </View>
  );
};




export default SplashScreen;
