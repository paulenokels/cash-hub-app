/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from 'src/screens/SplashScreen/SplashScreen'
import HomeScreen from 'src/screens/HomeScreen/HomeScreen'
import LoginScreen from 'screens/Auth/LoginScreen';
import RegisterScreen from 'screens/Auth/Registration/RegisterScreen';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';



const AppNavigator = createStackNavigator(
  {
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }

  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  RegisterScreen: RegisterScreen,
},
{
  initialRouteName: "HomeScreen",
}
)

const RootNavigator = createAppContainer(AppNavigator); 






export default RootNavigator;
