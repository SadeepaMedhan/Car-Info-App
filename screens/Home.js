import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewCar from './NewCar';
import Settings from './Settings';
import TabBar from '../components/TabBar';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
    activeColor="#343434"
    inactiveColor="#696969"
    barStyle={{ backgroundColor: '#CDCDCD' }}
    
  >
      <Tab.Screen name="New Car" component={NewCar} />
      <Tab.Screen name="View All" component={NewCar} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}