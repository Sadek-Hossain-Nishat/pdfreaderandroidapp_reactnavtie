import { WebView } from "react-native-webview";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import DocumentPicker from "react-native-document-picker";





// class WebViewreactExample extends Component {
//   render() {
//     return (
//       <WebView
//         source={{ uri: 'https://infinite.red' }}
//         style={{ marginTop: 20 }}
//       />
//     );
//   }
// }
//



const WebViewreactExample = () => {

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
    <View style={{flex:1}}>

      <WebView
        source={{ uri:path }}
        style={{ flex:1}}
      />


    </View>


  );
};

export default WebViewreactExample;

// export default WebViewreactExample;
