import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import Pdf from "react-native-pdf";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { BottomNavigation } from "react-native-paper";







const PdfReader = () => {

  const [path, setPath] = useState('');
  const [got, setGot] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);


  useEffect(() => {
    let initialUrl
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      initialUrl = await Linking.getInitialURL();


    };

    getUrlAsync().then(r=>{
      if(initialUrl!=null){
        setGot(true)
        setPath(initialUrl)

      }
    else selectOneFile().then(r => console.log("success"))} )
      .catch(
        e=> selectOneFile().then(r => console.log("success"))
      )



    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();






  }, []);

  const selectOneFile = async () => {
    // To Select File
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.pdf],

      });
      if (res) {
        let uriarray = res.map((file,index)=>file.uri);
        let uri = uriarray[0]
        setGot(true)
        setPath(uri)
        if (Platform.OS === 'ios') {
          // Remove 'file://' from file path for FileViewer
          uriarray = res.map((file,index)=>file.uri.replace('file://', ''));
          setGot(true)
          setPath(uri)
        }
        console.log('URI : ' + uri);

      }
    } catch (err) {
      // Handling Exception
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        setGot(false)

      } else {
        // For Unknown Error
        setGot(false)

        throw err;
      }
    }
  };


  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };



  const nofileYetScreen =<View style={{alignItems:'center',
    height:'100%',width:'100%'}}>

    <Image style={{height:150,width:150,marginTop:150}} source={require('./appfiles/appimages/filesimage.png')}/>

    <Text style={{fontWeight:'bold',fontSize:20,}}>
      No file is selected
    </Text>

    <Text style={{fontSize:15,fontWeight:'500'}}>
      Click the plus button to select a file
    </Text>

    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 100,
       marginBottom:20,
        marginRight:20
      }}
      onPress={selectOneFile}
    >
      <Image style={{height:110,width:110}} source={require('./appfiles/appimages/floatingbutton.png')}/>
    </TouchableOpacity>




  </View>


  const pdfReader = <View style={styles.container}>

    <Pdf
      page={pageNumber}


      source={{uri:path}}
      onLoadComplete={(numberOfPages,filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page,numberOfPages) => {
        console.log(`Current page: ${page}`);
        setPageNumber(page)
      }}
      onError={(error) => {
        console.log(error);
      }}
      onPressLink={(uri) => {
        console.log(`Link pressed: ${uri}`);
      }}
      style={styles.pdf}/>
  </View>

  return got?pdfReader:nofileYetScreen;



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
export default PdfReader;
