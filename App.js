import { StackNavigator } from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import RegisterScreen from './components/RegisterScreen'
import LoginScreen from './components/LoginScreen'
import NewConversationScreen from './components/NewConversationScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  NewConversation: { screen: NewConversationScreen }
})
