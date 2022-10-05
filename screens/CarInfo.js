import React, { useState } from 'react'
import { Button, HStack, Text, VStack } from 'native-base';
import Connection from '../Connection';
import { Image } from 'react-native';


export default function CarInfo({ navigation, route }) {
  const [car, setCar] = useState('');
  const url = Connection().url;

  React.useEffect(() => {
    if (route.params?.car_id) {
      getCar(route.params?.car_id)
    }
  },
    [route.params?.car_id]);

  const getCar = async (id) => {
    try {
      const response = await fetch(url + 'car/' + id);
      const vehicle = await response.json();
      setCar(vehicle);
      //console.log(vehicle);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCar = () => {
    fetch(url + 'car/' + car._id, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json === "Deleted!") {
          navigation.navigate("View All")
        }
      });
  }

  return (
    <VStack bg="coolGray.300" rounded="md" shadow={3} alignItems="center" justifyContent="flex-start" space={4}>

      <Text fontSize="2xl">{car.brand}</Text>
      {car.img !== null &&
        <Image
          source={{ uri: car.img }}
          style={{ width: 250, height: 250, }}
          resizeMode='contain'
        />
      }
      {/* <Image source={require('../assets/car1.png')} alt="img" h="100" w="80%" resizeMode='contain' /> */}
      <Text fontSize="sm">Price : {car.price}LKR</Text>
      <Text fontSize="sm">{car.description}</Text>

      <HStack m='5' alignItems="flex-end" justifyContent="flex-end" space={4}>
        <Button w='100' colorScheme="gray" onPress={() => { navigation.navigate("updateCar", { car: car, user_id: route.params?.userId }) }}>Edit</Button>
        <Button w='100' colorScheme="danger" onPress={deleteCar}>Remove</Button>
      </HStack>
    </VStack>
  )
}