import React, { useEffect, useState } from "react";


import PdfReader2 from "./PdfReader2";
import SplashScreen from "./appfiles/SplashScreen";
import BottomNav from "./BottomNavigationPaper";
import { Alert, BackHandler } from "react-native";



const MainScreen2 = () => {
  const [start, setStart] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {

      setStart(false)

    }, 5000);

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );








    return ()=>{
      clearTimeout(timer)
      backHandler.remove()

    };
  }, []);


  const backAction = () => {



    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,

        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);

    return true;
  };



  return (


    start?<SplashScreen/>:<BottomNav/>


  );
};

export default MainScreen2;
