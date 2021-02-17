import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

// import AppDrawerNavigator from './AppDrawerNavigator'
import UserDetail  from '../screens/userDetail';




export const AppStackNavigator = createStackNavigator({
  BarterList : {
    screen : HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  UserDetail : {
    screen : UserDetail,
    navigationOptions:{
      headerShown : false
    }
  },

},
  {
    initialRouteName: 'BarterList'
  }
);
