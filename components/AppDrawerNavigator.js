import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { TabNavigator } from './AppTabNavigator'
import customSidebarMenu  from './CustomSideBarMenu';
import HomeScreen from './screens/HomeScreen'
import Exchange from './screens/Exchange';
import SettingScreen from './screens/SettingScreen';
import MyBartersScreen from './screens/MyBarters';
import NotificationScreen from './screens/NotificationScreen';
import MyReceivedItemsScreen from '../screens/MyRecievedItems';

const AppDrawNavigator = createDrawerNavigator({
    Home : {
      screen : TabNavigator
      },
    MyBarters:{
        screen : MyBartersScreen,
      },
    Notifications :{
      screen : NotificationScreen
    },
    MyReceivedItems:{
      screen: MyReceivedItemsScreen
    },
    Settings : {
      screen : SettingScreen
      }
    },
    
    {
      contentComponent:customSidebarMenu
    },
    {
      initialRouteName : 'Home'
    })