import { View, Text } from 'react-native'
import React from 'react'

export default function CarInfo({navigation, route}) {
  React.useEffect(() => {
    if (route.params?.car_id) {}},
     [route.params?.car_id]);
  return (
    <View>
      <Text>CarInfo </Text>
      <Text>{route.params?.car_id}</Text>
    </View>
  )
}