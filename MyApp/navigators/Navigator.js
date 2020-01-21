import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../views/Home";
import Profile from "../views/Profile";
import Single from "../views/Single";

const TabNavigator = createBottomTabNavigator (
  // RouteConfigs
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeBackgroundColor: "#df933d",
      activeTintColor: "#000000",
      labelStyle: {
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
      }
    }
  }
);

const Navigator = createStackNavigator (
  // RouteConfigs
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false // this will hide the header
      },
    },
    Single: {
      screen: Single,
      navigationOptions: {
        title: "Post",
      }
    },
  }
);

export default createAppContainer(Navigator);
