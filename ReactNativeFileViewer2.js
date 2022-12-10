import React from "react";
import { Button, View } from "react-native";
import FileViewer from "react-native-file-viewer";

const ReactNativeFileViewer2 = () => {



  const select =async ()=>{

    FileViewer.open(path) // absolute-path-to-my-local-file.
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
      });

  }
  return (
    <View style={{height:'100%',width:'100%',alignItems:'center',
    alignContent:'center',justifyContent:'center'}}>


      <Button title={'select'} onPress={select}/>



    </View>
  );
};

export default ReactNativeFileViewer2;
