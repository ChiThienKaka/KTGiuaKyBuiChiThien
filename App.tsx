import { View, Text } from 'react-native'
import React from 'react'
//import Login from './Screens/CreateAccount'
import Login from './Screens/Login'
import MyStack from './Route/router'
import { NavigationContainer } from '@react-navigation/native'
import { MyContextControllerProvider } from './store'
import Home from './Screens/Home'

const App = () => {
  return (
    <MyContextControllerProvider>
        <NavigationContainer>
            <MyStack/>
      </NavigationContainer>
    </MyContextControllerProvider>
    
  )
}

export default App