import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import RNPdfToImage from "react-native-pdf-to-image";

import DocumentPicker from "react-native-document-picker";

const ImagetoPdfConverterinReactNative = () => {



  const [path, setPath] = useState("");

  useEffect(() => {



    selectOneFile().then(r => console.log("success"));


  }, []);





  const selectOneFile = async () => {
    // To Select File
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.pdf],

      });
      if (res) {
        let uriarray = res.map((file, index) => file.uri);
        let uri = uriarray[0];
        setPath(uri);

        if (Platform.OS === "ios") {
          // Remove 'file://' from file path for FileViewer
          uriarray = res.map((file, index) => file.uri.replace("file://", ""));
          setPath(uri);
          convertPdfToImage()
        }
        console.log("URI : " + uri);

      }
    } catch (err) {
      // Handling Exception
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert("Canceled");
      } else {
        // For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };




  const convertPdfToImage = () => {

    RNPdfToImage.convert(path);

  }
  return (
    <View>

    </View>
  );
};

export default ImagetoPdfConverterinReactNative;
