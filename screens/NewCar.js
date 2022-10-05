import React, { useState } from 'react';
import { VStack, Box, Divider, FormControl, TextArea, Button, Input, HStack, Text } from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import Connection from '../Connection';
import { Alert, Image } from 'react-native';


export default function NewCar({user_id, navigation }) {
  const url = Connection().url;
  const [brand, setBrand] = useState('');
  const [reg_number, setReg_number] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [userId, setUserId] = useState(user_id);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //console.log(response);
        let source = { uri: response.assets[0].uri };

        setImageSource(source.uri);
      }
    });
  }

  const saveCar = async () => {

    if (brand !== "") {
      let data = {
        brand: brand,
        reg_number: reg_number,
        price: price,
        description: description,
        img: imageSource,
        user_id: userId
      }
      const promise = new Promise((resolve, reject) => {
        fetch(url + 'car', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({type : "save", data })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            if (responseJson === "Saved!") {
              setBrand("");
              navigation.navigate("View All")
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
    
      <VStack m="3" alignItems="center" justifyContent="center" space="3" >
        <Text mt="2" fontSize="2xl">Add New Car</Text>
        <FormControl>
          <FormControl.Label>Brand</FormControl.Label>
          <Input borderRadius="30" value={brand} onChangeText={(e) => { setBrand(e) }} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Reg. No</FormControl.Label>
          <Input borderRadius="30" value={reg_number} onChangeText={(e) => { setReg_number(e) }} />
        </FormControl>
        <FormControl>
          <FormControl.Label>price</FormControl.Label>
          <Input borderRadius="30" value={price} onChangeText={(e) => { setPrice(e) }} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Description</FormControl.Label>
          <Input borderRadius="30" value={description} onChangeText={(e) => { setDescription(e) }} />
        </FormControl>
        <HStack alignItems="flex-start" space="3">

          <Button onPress={selectImage} >Pick Image</Button>
          {imageSource !== null &&
            <Image
            source={{ uri: imageSource }}
            style={{ width: 100, height: 100,}}
            resizeMode='contain'
            />
          }
        </HStack>
          <Button mt="2" w="90%" borderRadius="30" colorScheme="indigo" onPress={saveCar}> Save</Button>

      </VStack>
 
  )
}