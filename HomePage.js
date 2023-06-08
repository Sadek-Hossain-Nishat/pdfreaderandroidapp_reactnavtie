import React, { useEffect } from "react";

import { createStackNavigator } from '@react-navigation/stack';

import PdfReader2 from "./PdfReader2";
import DocumentPicker from "react-native-document-picker";
import { Alert, BackHandler, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { FAB, Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import CustomAppBar from "./CustomAppBar";


const HomePage = () => {


  useEffect(()=>{





  },[])





  const selectOneFile = async (navigation) => {
    // To Select File
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.pdf],

      });
      if (res) {
        let uriarray = res.map((file,index)=>file.uri);
        let uri = uriarray[0]

        navigation?.push('Details', {
          uri
        })
        if (Platform.OS === 'ios') {
          // Remove 'file://' from file path for FileViewer
          uriarray = res.map((file,index)=>file.uri.replace('file://', ''));

          navigation?.push('Details', {
            uri
          })
        }
        console.log('URI : ' + uri);

      }
    } catch (err) {
      // Handling Exception
      if (DocumentPicker.isCancel(err)) {


      } else {


        throw err;
      }
    }
  };



  const NofileYetScreen =({navigation})=>{






    return (


      <View style={{alignItems:'center',
        height:'100%',width:'100%'}}>
        <StatusBar backgroundColor={"#1ddb82"} />

        {/*<View style={styles.TopBarScreen}>*/}

        {/*  /!*<Icon name="home" size={30} color="white" />*!/*/}

        {/*  <Text style={styles.TopBarScreen.titleStyle}>Home</Text>*/}

        {/*</View>*/}

        {/*<Image style={{height:150,width:150,marginTop:150}} source={require('./appfiles/appimages/filesimage.png')}/>*/}

        <Icon style={{marginTop:150}} name="folder" size={120} color="#00aced" />

        <Text style={{fontWeight:'bold',fontSize:20}}>
          No file is selected
        </Text>

        <Text style={{fontSize:15,fontWeight:'500'}}>
          Click the plus button to select a file
        </Text>



        <FAB
          style={{
            alignSelf: "flex-end",
            marginRight: 25,
            marginTop: 180,
          }}

          onPress={()=>selectOneFile(navigation)}

          visible={true}
          icon={{ name: "add", color: "white" }}
          color="#1ddb82"
        />




      </View>




    );
  }


  const styles = StyleSheet.create({

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

  });







  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"


                       screenOptions={{


                         header: (props) => <CustomAppBar {...props} />
                       }}




      >
        <Stack.Screen   name="Home" component={NofileYetScreen} />
        <Stack.Screen name="Details" component={PdfReader2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomePage;


// react navigation

// https://callstack.github.io/react-native-paper/docs/guides/react-navigation