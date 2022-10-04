import React from 'react'
import { NativeBaseProvider } from "native-base";
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import CarInfo from './screens/CarInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateCar from './screens/UpdateCar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CarInfo" component={CarInfo} options={{ title: 'Overview' }}/>
          <Stack.Screen name="updateCar" component={UpdateCar} options={{ title: 'Update Details' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}