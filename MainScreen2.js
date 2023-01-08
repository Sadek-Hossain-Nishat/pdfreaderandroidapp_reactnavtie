import React, { useEffect, useState } from "react";


import PdfReader2 from "./PdfReader2";
import SplashScreen from "./appfiles/SplashScreen";



const MainScreen2 = () => {
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


    start?<SplashScreen/>:<PdfReader2/>


  );
};

export default MainScreen2;
