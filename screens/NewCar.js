import React, { useState } from 'react';
import { VStack, Box, Divider, FormControl, TextArea, Button, Input, HStack } from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

export default function NewCar() {

  const [brand, setBrand] = useState('');
  const [reg_number, setReg_number] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const [filePath, setFilePath] = useState({});
 
  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        //let source = response;
        //You can also display the image using data:
        let source = {
          uri: 'data:image/jpeg;base64,' + response.data
        };
        setFilePath(source);
      }
    });
  };



  const saveCar = async () => {
    
    if (brand !== "") {
      let data = {
        brand: brand,
        reg_number: reg_number,
        price: price,
        description: description,
        img: img
      }
      const promise = new Promise((resolve, reject) => {
        fetch('http://192.168.8.102:4000/car', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ data })
        })
          .then((response) => response.json())
          .then((responseJson) => console.log(responseJson))
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
        <Box px="4" pt="4">
          Add New Car
        </Box>

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
            
            <Button onPress={chooseFile} >Camara</Button>

          </FormControl>
        </VStack>

        <Box px="4" pb="4">
          <Button mt="2" colorScheme="indigo" onPress={saveCar} >
            Save
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}