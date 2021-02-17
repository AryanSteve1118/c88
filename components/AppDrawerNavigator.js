import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { TabNavigator } from './AppTabNavigator'
import customSidebarMenu  from './CustomSideBarMenu';
import HomeScreen from './screens/HomeScreen'
import Exchange from './screens/Exchange';
import SettingScreen from './screens/SettingScreen.js';

const AppDrawNavigator = createDrawerNavigator({
    Home : {
      screen : TabNavigator
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