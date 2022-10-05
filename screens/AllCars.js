import React, { useEffect, useState } from 'react'
import { isEmptyObj, Text, VStack } from 'native-base'
import Card from '../components/Card'
import { FlatList, TouchableOpacity } from 'react-native'
import Connection from '../Connection'


export default function AllCars({ user_id, navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCars(user_id);
  }, [navigation]);

  const getAllCars = async (id) => {
    try {
      const response = await fetch(Connection().url+'car',{
        method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({type : "user", userId : id})
      });
      const carList = await response.json();
      setData(carList);
      console.log(carList);
      
      console.log("load carList");
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <VStack alignItems="center" space={3}>

      {data[0] !== undefined ?
        <FlatList 
        data={data}
        renderItem={(car) =>
          <TouchableOpacity onPress={() => { navigation.navigate("CarInfo", { car_id: car.item._id }) }} style={{margin:10}}>
            <Card car_info={car.item}/>
          </TouchableOpacity>
        } /> :
        <VStack h="100%" justifyContent="center">
         <Text fontSize="xl">Not found</Text>
        </VStack>
         }

    </VStack >
  )
}