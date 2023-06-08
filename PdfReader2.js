import React, { useEffect, useRef, useState } from "react";
import {
  Alert, Animated,
  BackHandler,
  Dimensions,
  Image,
  Linking, PanResponder,
  Platform, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DialogInput from 'react-native-dialog-input';
import Pdf from "react-native-pdf";
import SharedPreferences from "react-native-shared-preferences";









const PdfReader2 = ({route, navigation }) => {

  const [path, setPath] = useState('');
  const [got, setGot] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);

  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const {uri} = route.params;
  // setPath(uri)





  const TOTAL_PAGES='totalpages'

  SharedPreferences.setName("pdfinformation");

  useEffect(() => {
    let initialUrl
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      initialUrl = await Linking.getInitialURL();


    };

    getUrlAsync().then(r=> {
        if (initialUrl != null) {

          setPath(initialUrl);

        }
      }
    )



    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    //
    // return () => backHandler.remove();






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

        // setCurrentPage(totalPages*Math.floor(pan.y.__getValue()/650))





        SharedPreferences.getItem(TOTAL_PAGES, function(value){
          console.log(value);
          // this.pdf.setPage((pan.y.__getValue()*parseInt(value))/650)


          if (pan.y.__getValue()<=0) {
            setCurrentPage(1)

          }else if (pan.y.__getValue() >= 510) {
            setCurrentPage(parseInt(value));
          } else {
            setCurrentPage(Math.floor((pan.y.__getValue()*parseInt(value))/510))
          }


        });








        console.log("y value: ", pan.y.__getValue());




      },
      onPanResponderEnd:(e,geustureState)=>{


        console.log("total pages,",totalPages);
        console.log("end :",pan.y.__getValue());


        SharedPreferences.getItem(TOTAL_PAGES, function(value){
          console.log(value);
          this.pdf.setPage(((pan.y.__getValue()*parseInt(value))/518))

        });




        console.log("current should be =>",((pan.y.__getValue()*totalPages)/518));









      },

      onPanResponderRelease: () => {
        pan.flattenOffset();

      },

    }),
  ).current;

  const showPdfInfo = () => {

    // this.pdf.setPage(currentPage+1)

    // this.pdf.setPage((pan.y.__getValue()*totalPages)/650)

    // Alert.alert('Alert Title', 'My Alert Msg', [
    //     //   {
    //     //     text: 'Cancel',
    //     //     onPress: () => console.log('Cancel Pressed'),
    //     //     style: 'cancel',
    //     //   },
    //     //   {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     // ])

    setVisible(true)



  //   https://www.nicesnippets.com/blog/how-to-create-alert-with-textinput-in-react-native
  //   https://www.npmjs.com/package/react-native-dialog-input


  }








  // const backAction = () => {
  //
  //
  //
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //
  //   return true;
  // };

  const handlebackArrow =()=>{

    setGot(false)










  }


  const handlePageSearch =()=>{



  }

  const handleShare = ()=>{

  }


  const changePageNumber = (inputText) => {

    


  }

  const pdfReader=<View style={styles.container}>
    <StatusBar backgroundColor={"#1ddb82"} />


    <Pdf

      ref={(pdf) => { this.pdf = pdf; }}
      source={{ uri: uri }}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`number of pages: ${numberOfPages}`);
        setTotalPages(numberOfPages)

        SharedPreferences.setItem(TOTAL_PAGES,numberOfPages.toString());

      }}



      enableAnnotationRendering={true}





      onPageChanged={(page, numberOfPages) => {
        console.log(`current page: ${page}`);

        //set the cuurentPage
        setCurrentPage(page)




        // pan.y.setValue(pan.y.__getValue()+(650/totalPages))
        pan.y.setValue((510/totalPages)*page)




      }}
      onError={(error) => {
        console.log(error);
      }}
      onPressLink={(uri) => {
        console.log(`Link presse: ${uri}`)
      }}
      style={styles.pdf} />

    <DialogInput








      ref ={(dialog)=>{this.dialog = dialog}}

      isDialogVisible={visible}
      title={"Go to page"}
      message={`1-${totalPages}\nCurrent page:${currentPage}`}
      hintInput ={"Enter page number"}
      submitInput={ (inputText) => {
        if (isNaN(inputText)) setInput('Error input,enter valid page number')
        else {

          changePageNumber(inputText)
          // setInput(inputText),
            setVisible(false);

        }

      }}
      closeDialog={() => setVisible(false)}>
    </DialogInput>
    <View  style={styles.pageNumber}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, {
            translateY: pan.y.interpolate({
              inputRange: [0, 510], outputRange: [0, 510],
              extrapolate:  "clamp",
            }),
          }],
        }}
        {...panResponder.panHandlers}
      >






        <TouchableOpacity onPress={showPdfInfo}>


          <View style={{
            height: 50,
            backgroundColor: "rgba(173, 173, 173, 0.5)",
            // borderRadius: 20,
            borderBottomLeftRadius:20,
            borderTopLeftRadius:20,


            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
            {/*<Text>{Math.floor(vertValue)}</Text>*/}
            <Text>{currentPage}</Text>

          </View>




        </TouchableOpacity>



      </Animated.View>
    </View>
  </View>

  // return got?pdfReader:<NofileYetScreen/>;
  return pdfReader;






};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

    backfaceVisibility: 'hidden'
  },
  TopBarScreen:{
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: '#1ddb82',
    alignItems: 'center',
    // justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    titleStyle: {
      marginLeft:10,
      fontSize:20,
      color:'white',
      fontWeight:'400'
    },
  },
  pdfViewTopBar:{

    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: '#1ddb82',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,

  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
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
export default PdfReader2;
