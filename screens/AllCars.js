import React, { useEffect, useState } from 'react'
import { VStack } from 'native-base'
import Card from '../components/Card'
import { FlatList, TouchableOpacity } from 'react-native'


export default function AllCars({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCars();
  }, []);

  const getAllCars = async () => {
    try {
      const response = await fetch('http://192.168.8.102:4000/car');
      const carList = await response.json();
      setData(carList);
      //setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack alignItems="center" space={3}>

      <FlatList 
        data={data}
        renderItem={(car) =>
          <TouchableOpacity onPress={() => { navigation.navigate("CarInfo", { car_id: car.item.brand }) }} style={{margin:10}}>
            <Card car_info={car.item}/>
          </TouchableOpacity>
        } />

    </VStack >
  )
}