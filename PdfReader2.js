import React, { useEffect } from "react";
import { Dimensions, Linking, Platform, StyleSheet, View } from "react-native";
import DocumentPicker from "react-native-document-picker";
import Pdf from "react-native-pdf";

const PdfReader2 = (props) => {


  return (
    <View style={styles.container}>

      <Pdf
        source={{uri:props.url}}
        onLoadComplete={(numberOfPages,filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}/>



    </View>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
});
export default PdfReader2;
