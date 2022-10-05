import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Box, Button, Divider, FormControl, Input, VStack } from 'native-base';
import Connection from '../Connection';


export default function UpdateCar({route,navigation}) {
    React.useEffect(() => {
        //console.log(route.params);
        setDetails(route.params.car)
    },[]);
    const url = Connection().url;    
    const [id, setId] = useState('');
    const [brand, setBrand] = useState('');
    const [reg_number, setReg_number] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
  
    const setDetails=(car)=>{
        setId(car._id);
        setBrand(car.brand);
        setReg_number(car.reg_number);
        setPrice(car.price);
        setDescription(car.description);
        setImg(car.img);
    }
  
    const update = async () => {
      
      if (brand !== "") {
        let data = {
          brand: brand,
          reg_number: reg_number,
          price: price,
          description: description,
          img: img
        }
        const promise = new Promise((resolve, reject) => {
          fetch(url+'car/'+id, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ data })
          })
            .then((response) => response.json())
            .then((responseJson) => {console.log(responseJson)
            if(responseJson==="Updated!"){
                navigation.navigate("CarInfo", { car_id: id })
            }
            })
            .catch((er) => {
              console.log('error: ' + er);
              return resolve(er)
            })
        })
        return await promise
      } else {
  
      }
    }
  
  
    return (
      <Box border="1" borderRadius="md">
        <VStack space="4" divider={<Divider />}>
  
          <VStack space={4} px="4">
            <FormControl>
              <FormControl.Label>Brand</FormControl.Label>
              <Input value={brand} onChangeText={(e) => { setBrand(e) }} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Reg. No</FormControl.Label>
              <Input value={reg_number} onChangeText={(e) => { setReg_number(e) }} />
            </FormControl>
            <FormControl>
              <FormControl.Label>price</FormControl.Label>
              <Input value={price} onChangeText={(e) => { setPrice(e) }} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input value={description} onChangeText={(e) => { setDescription(e) }} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Images</FormControl.Label>
              
              <Button  >Camara</Button>
  
            </FormControl>
          </VStack>
  
          <Box px="4" pb="4">
            <Button mt="2" colorScheme="indigo" onPress={update} >
              Update
            </Button>
          </Box>
        </VStack>
      </Box>
    )}