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
import {Icon } from 'react-native-elements';

const AppDrawNavigator = createDrawerNavigator({
    Home : {
      screen : TabNavigator,
      navigationOptions:{
        drawerIcon : <Icon name="home" type ="fontawesome5" />
      }
      },
    MyBarters:{
        screen : MyBartersScreen,
        navigationOptions:{
          drawerIcon : <Icon name="gift" type ="font-awesome" />,
          drawerLabel : "My Barters"
        }
      },
    Notifications :{
      screen : NotificationScreen,
      navigationOptions:{
        drawerIcon : <Icon name="bell" type ="font-awesome" />,
        drawerLabel : "Notifications"
      }
    },
    MyReceivedItems:{
      screen: MyReceivedItemsScreen,
      navigationOptions:{
        drawerIcon : <Icon name="gift" type ="font-awesome" />,
        drawerLabel : "My Received Items"
      }
    },
    Settings : {
      screen : SettingScreen,
      navigationOptions:{
        drawerIcon : <Icon name="settings" type ="fontawesome5" />,
        drawerLabel : "Settings"
      }
      }
    },
    
    {
      contentComponent:customSidebarMenu
    },
    {
      initialRouteName : 'Home'
    })