import { StackNavigator } from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import RegisterScreen from './components/RegisterScreen'
import LoginScreen from './components/LoginScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen }
})
