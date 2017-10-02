import { StackNavigator } from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import RegisterScreen from './components/RegisterScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  //Login: { screen: Login },
  Register: { screen: RegisterScreen }
})
