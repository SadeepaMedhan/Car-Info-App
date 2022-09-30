import React from 'react';
import { VStack, Box, Divider,Image ,TextArea,Button} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function NewCar() {
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          Add New Car
        </Box>
        
        <Box  px="4">
      <TextArea h={20} placeholder="Details" w="75%" maxW="300" />
    </Box>
        
        <Box px="4" pb="4">
        <Button mt="2" colorScheme="indigo" >
            Save
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}