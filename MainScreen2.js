import React, { useEffect, useState } from "react";
import { Dimensions, Image, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import DocumentPicker from "react-native-document-picker";
import Pdf from "react-native-pdf";


const MainScreen2 = () => {

  const [path, setPath] = useState("");
  const [start, setStart] = useState(true);


  useEffect(() => {

    let initialUrl;


    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      initialUrl = await Linking.getInitialURL();


    };

    setTimeout(() => {

      setStart(false);


      getUrlAsync().then(r => {


          if (initialUrl != null) {
            setPath(initialUrl);

          } else {

            selectOneFile().then(r => console.log("success"));
          }


        },
      )
        .catch(
          e => {


            selectOneFile().then(r => console.log("success"));


          },
        );


    }, 5000);


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

  const SplashScreen = <View style={{
    alignItems: "center", justifyContent: "center",
    height: "100%", width: "100%",
  }}>
    <Image style={{ height: 100, width: 100 }} source={require("./appfiles/appimages/pdflogo.png")} />
    <Text style={{ fontSize: 20, color: "green" }}>
      SHN PDF READER
    </Text>

  </View>;


  return (


    start ? SplashScreen : <View style={styles.container}>



        <Pdf

          source={{ uri: path }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);

          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf} />









    </View>


  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {

    flex:1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});


export default MainScreen2;
