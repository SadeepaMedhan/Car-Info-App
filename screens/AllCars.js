import React, { useEffect, useState } from 'react'
import { Text, VStack } from 'native-base'
import Card from '../components/Card'
import { FlatList, TouchableOpacity } from 'react-native'
import Connection from '../Connection'


export default function AllCars({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCars();
  }, [navigation]);

  const getAllCars = async () => {
    try {
      const response = await fetch(Connection().url+'car');
      const carList = await response.json();
      setData(carList);
      setLoading(true);
      console.log("load carList");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } 
  }

  return (
    <VStack alignItems="center" space={3}>

      {isLoading === true ?
        <FlatList 
        data={data}
        renderItem={(car) =>
          <TouchableOpacity onPress={() => { navigation.navigate("CarInfo", { car_id: car.item._id }) }} style={{margin:10}}>
            <Card car_info={car.item}/>
          </TouchableOpacity>
        } /> :
         <Text>Not found</Text>
         }

    </VStack >
  )
}