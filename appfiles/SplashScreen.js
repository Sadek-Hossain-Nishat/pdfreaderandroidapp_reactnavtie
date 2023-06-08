import React from "react";
import { Image, StatusBar, Text, View } from "react-native";

const SplashScreen = () => {

  return (
    <View style={{alignItems:'center',justifyContent:'center',
    height:'100%',width:'100%'}}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />
      <Image style={{height:100,width:100}} source={require('./appimages/pdflogo.png')}/>
      <Text style={{fontSize:20,color:'green'}}>
        SHN PDF READER
      </Text>

    </View>
  );
};




export default SplashScreen;
