import React from 'react';
import { VStack, Box, Divider, FormControl, TextArea, Button, Input, HStack } from 'native-base';

export default function NewCar() {
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          Add New Car
        </Box>

        <VStack space={4} px="4">
          <Input  />
          <Input placeholder='Brand' />
          <Input placeholder='Price' />
          <TextArea h={20} placeholder="Details" />
        </VStack>

        <Box px="4" pb="4">
          <Button mt="2" colorScheme="indigo" >
            Save
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}