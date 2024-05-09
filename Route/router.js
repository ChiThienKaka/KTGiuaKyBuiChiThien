import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import CreateAccount from '../Screens/CreateAccount';
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Create" component={CreateAccount} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
export default MyStack;