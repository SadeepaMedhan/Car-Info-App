import React from 'react'
import { Button, HStack, Text, VStack } from 'native-base'

export default function Settings() {
  return (
    <VStack space={4} justifyContent="center">
      <HStack m='5' space={4} justifyContent="center">
        <Text>IMG</Text>
        <VStack>
        <Text>Name</Text>
        <Text>Email</Text>
      <Button mt="2" colorScheme="light">View Profile</Button>
        </VStack>
      </HStack>
      <Button>Connection</Button>
    </VStack>
  )
}