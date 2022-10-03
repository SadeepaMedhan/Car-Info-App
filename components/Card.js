import React from 'react'
import { Image, VStack, Text, HStack } from 'native-base';

export default function Card(props) {
  return (

    <HStack w="98%" h="40" bg="indigo.300" rounded="md" shadow={3} alignItems="center" justifyContent="space-around" space={2}>
      
        <VStack space={1} alignItems="flex-start" >
          <Text fontSize="2xl">{props.car_info.brand}</Text>
          <Text fontSize="sm">{props.car_info.reg_number}</Text>
          <Text fontSize="sm">{props.car_info.price}LKR</Text>
        </VStack>
      
      <Image source={require('../assets/car1.png')} alt="img" h="80%" w="250" />

    </HStack>
  )
}