import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Box, Button, Divider, FormControl, HStack, Input, VStack } from 'native-base';
import Connection from '../Connection';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function UpdateCar({route, navigation }) {
  React.useEffect(() => {
    //console.log(route.params);
    setDetails(route.params.car)
  }, []);
  const url = Connection().url;
  const [id, setId] = useState('');
  const [brand, setBrand] = useState('');
  const [reg_number, setReg_number] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);

  const setDetails = (car) => {
    setId(car._id);
    setBrand(car.brand);
    setReg_number(car.reg_number);
    setPrice(car.price);
    setDescription(car.description);
    setImageSource(car.img);
  }

  const update = async () => {

    if (brand !== "") {
      let data = {
        brand: brand,
        reg_number: reg_number,
        price: price,
        description: description,
        img: imageSource,
        user_id: route.params.user_id
      }
      const promise = new Promise((resolve, reject) => {
        fetch(url + 'car/' + id, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ data })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            if (responseJson === "Updated!") {
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
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>

        <VStack space={4} px="4">
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
                style={{ width: 100, height: 100, }}
                resizeMode='contain'
              />
            }
          </HStack>
        </VStack>

        <Box px="4" pb="4">
          <Button mt="2" colorScheme="indigo" onPress={update} >
            Update
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}