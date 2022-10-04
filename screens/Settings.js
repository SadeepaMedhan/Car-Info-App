import React, { useState } from 'react'
import { Button, HStack, Text, VStack } from 'native-base'

export default function Settings(params) {
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    console.log(params.id);
  },
    []);

  const getUser = async (id) => {
    try {
      const response = await fetch('http://192.168.8.102:4000/user/' + id);
      const u = await response.json();
      setUser(u);
      console.log(u);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <VStack space={4} justifyContent="center">
      <HStack m='5' space={4} justifyContent="center">
        <Text>IMG</Text>
        <VStack>
        <Text>Name</Text>
        <Text>Email</Text>
      <Button mt="2">View Profile</Button>
        </VStack>
      </HStack>
      <Button>Connection</Button>
    </VStack>
  )
}
