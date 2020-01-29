import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator} from "react-navigation";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Single from "../views/Single";
import Login from "../views/Login";
import AuthLoading from "../views/AuthLoading";
import { Icon } from "native-base";

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        }

        // You can return any component that you like here!
        return <Icon style={{color: "#3F51B5"}}
          name={iconName}
          size={25}
        />;
      },
    }),
    tabBarOptions: {
      showLabel: false
    },
  }
);

const StackNavigator = createStackNavigator (
  // RouteConfigs
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false, // this will hide the header
      },
    },
    Single: {
      screen: Single,
    },
    Logout: {
      screen: Login,
    },
  },
);

const Navigator = createSwitchNavigator (
    {
      AuthLoading: AuthLoading,
      App: StackNavigator,
      Auth: Login,
    },
    {
      initialRouteName: "AuthLoading",
    }
);

export default createAppContainer(Navigator);
