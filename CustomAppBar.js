import React from "react";
import { Appbar,Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

const CustomAppBar = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);


  







  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name=='Details'?'':title} />

      <Menu  anchor={
        <Appbar.Action
          icon="magnify"
          onPress={console.log('menu clicked')}
        />}>

      </Menu>

      <Menu  anchor={
        <Appbar.Action
          icon="share"
          onPress={console.log('menu clicked')}
        />}>

      </Menu>






    </Appbar.Header>

  );
};

export default CustomAppBar;