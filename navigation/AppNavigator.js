import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import UserSignUpScreen from '../screens/UserSignUpScreen';

const MainNavigator = createStackNavigator({
  Main: { 
    screen: LoginScreen, 
    navigationOptions: {
      header: null,
    }
  },
  Home: { screen: HomeScreen },
  SignUp: { screen : UserSignUpScreen }
});

const App = createAppContainer(MainNavigator);

export default App;