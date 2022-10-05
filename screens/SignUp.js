import React, { useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Input, Button } from "native-base";
import userService from '../service/userService';
import Connection from '../Connection';


export default function SignUp({ navigation }) {
  const url = Connection().url;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const saveUser = async () => {
    if (name !== "") {
      let formData = {
        name: name,
        email: email,
        password: password,
        phone: phone
      }

      const promise = new Promise((resolve, reject) => {
        fetch(url+'user', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ formData })
        })
          .then((response) => response.json())
          .then((responseJson) => {console.log(responseJson)
          if(responseJson==="Saved!"){
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigation.navigate("Login")
          }
          })
          .catch((er) => {
            console.log('error: ' + er);
            return resolve(er)
          })
      })
      return await promise

    }
    // form.append(uploadFileName, {
    //   uri : localImage.full,
    //   type: 'image/jpeg',
    //   name: uploadFileName
    //  })
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input borderRadius="30" value={name} onChangeText={(e) => { setName(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input borderRadius="30" value={email} onChangeText={(e) => { setEmail(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone</FormControl.Label>
            <Input borderRadius="30" value={phone} onChangeText={(e) => { setPhone(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input borderRadius="30" type="password" value={password} onChangeText={(e) => { setPassword(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input borderRadius="30" type="password" value={confirmPassword} onChangeText={(e) => { setConfirmPassword(e) }} />
          </FormControl>
          <Button borderRadius="30" mt="2" colorScheme="indigo" onPress={saveUser}>
            Register
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}