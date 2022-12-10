import React, { useEffect, useState } from "react";
import { View } from "react-native";
import SplashScreen from './SplashScreen';
import PdfBookScreen from "../PdfBookScreen";
import PdfReader from "../PdfReader";

const MainScreen = () => {
  const [start, setStart] = useState(true);

  useEffect(() => {
   let timer = setTimeout(() => {

      setStart(false)

    }, 5000);
   return ()=>{
     clearTimeout(timer)

   };
  }, []);



  return (


      start?<SplashScreen/>:<PdfReader/>


  );
};

export default MainScreen;
