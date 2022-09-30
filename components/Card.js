import React from 'react'
import {Center,Image,VStack,Text, HStack } from 'native-base';
import img from './assets/appicon.png';


export default function Card() {
  return (
   <HStack w="90%" h="40" bg="indigo.300" rounded="md" shadow={3} alignItems="center" justifyContent="space-around" space={3}>
    <VStack space={1} alignItems="center">
      <Text fontSize="2xl">Toyota</Text>
      <Text fontSize="sm">50000LKR</Text>
      
    </VStack>
      <Image source= {require('./assets/car1.png')} alt="img" h="80%" w="250"/>

   </HStack>
  )
}