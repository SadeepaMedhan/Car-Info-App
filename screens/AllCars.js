import React from 'react'
import { VStack  } from 'native-base'
import Card from '../components/Card'
import { TouchableOpacity } from 'react-native'


export default function AllCars({navigation}) {
  return (
    <VStack alignItems="center" space={3}>
      <TouchableOpacity onPress={() => { navigation.navigate("CarInfo",{car_id:'1234'}) }}>
    <Card />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate("CarInfo",{car_id:'55555'}) }}>
    <Card />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate("CarInfo",{car_id:'32323'}) }}>
    <Card />
      </TouchableOpacity>
    </VStack >
  )
}