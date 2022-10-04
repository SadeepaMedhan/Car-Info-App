import React, { useEffect, useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewCar from './NewCar';
import AllCars from './AllCars';
import Settings from './Settings';
import TabBar from '../components/TabBar';


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
      <Tab.Screen name="New Car" component={NewCar} />
      <Tab.Screen name="View All" component={AllCars} />
      <Tab.Screen name="Settings">
      {(props) => <Settings id={route.route.params.user_id} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}