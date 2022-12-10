import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import DocumentPicker from 'react-native-document-picker';
import FileViewer from "react-native-file-viewer";




const PdfBookScreen = () => {
  const [fileResponse, setFileResponse] = useState([]);

  useEffect(() => {
    handleDocumentSelection().then(r => console.log("success"));
  }, []);


  const handleDocumentSelection = useCallback(async () => {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      await FileViewer.open(res.uri);
    } catch (e) {
      // error
    }}
  , []);


  return (

     <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 100 }}>

      {/*{fileResponse.map((file, index) => (*/}


      {/* <Text*/}
      {/*  key={index.toString()}*/}
      {/*  style={styles.uri}*/}
      {/*  numberOfLines={1}*/}
      {/*  ellipsizeMode={'middle'}>*/}
      {/*   {file.uri}*/}


      {/*</Text>*/}


      {/*))}*/}

      {/*<Text>*/}
      {/*  Hello React Native*/}
      {/*</Text>*/}


    </View>


  );
};

export default PdfBookScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
