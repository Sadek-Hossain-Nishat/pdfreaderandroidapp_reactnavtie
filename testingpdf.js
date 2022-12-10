import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Platform, Animated, PanResponder } from "react-native";

import Pdf from 'react-native-pdf';
import DocumentPicker from "react-native-document-picker";



function Testingpdf() {
  const [currentPage, setCurrentPage] = useState(1)
  const [vertValue, setVertValue] = useState(0);
  const [path, setPath] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {



            selectOneFile().then(r => console.log("success"));


  }, []);







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

      onPanResponderMove: (e, gestureState) => {




        pan.y.setValue(gestureState.dy);


        if (pan.y.__getValue()<=0) {
          setVertValue(0)

        }else if (pan.y.__getValue() >= 600) {
          setVertValue(600);
        } else {
          setVertValue(pan.y.__getValue())
        }

        console.log("y value: ", pan.y.__getValue());




      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },

    }),
  ).current;




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


  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: path }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
          setTotalPages(numberOfPages)

        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
          setCurrentPage(page)  //set the cuurentPage
          pan.y.setValue((650/totalPages))
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presse: ${uri}`)
        }}
        style={styles.pdf} />
      <View  style={styles.pageNumber}>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, {
              translateY: pan.y.interpolate({
                inputRange: [0, 650], outputRange: [0, 650],
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
            {/*<Text>{Math.floor(vertValue)}</Text>*/}
            <Text>{currentPage}</Text>

          </View>


        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

    backfaceVisibility: 'hidden'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageNumber: {
    flex:.1,
    flexDirection:'column',


    right:0,
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',




  }
});

export default Testingpdf;
