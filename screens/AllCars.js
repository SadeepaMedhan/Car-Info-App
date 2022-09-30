import React from 'react'
import { VStack  } from 'native-base'
import Card from '../components/Card'


export default function AllCars() {
  return (
    <VStack alignItems="center" space={3}>
    <Card/>
    <Card/>
    </VStack >
  )
}