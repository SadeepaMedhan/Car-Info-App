import React, { useEffect, useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewCar from './NewCar';
import AllCars from './AllCars';
import Settings from './Settings';
import TabBar from '../components/TabBar';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createMaterialBottomTabNavigator();

export default function Home(route) {

  getUser=()=>{
    return id;
  }

  return (
    <Tab.Navigator
    activeColor="#343434"
    inactiveColor="#696969"
    barStyle={{ backgroundColor: '#CDCDCD' }}
  >
      <Tab.Screen name="New Car" >
        {(props) => <NewCar user_id={route.route.params.user_id} {...props}/>}
      </Tab.Screen>
      <Tab.Screen name="View All" >
        {(props) => <AllCars user_id={route.route.params.user_id} {...props}/>}
      </Tab.Screen>
      <Tab.Screen name="Settings" >
      {(props) => <Settings id={route.route.params.user_id} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}