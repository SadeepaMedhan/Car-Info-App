import React, { useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Input, Button } from "native-base";
import userService from '../service/userService';


export default function SignUp({ navigation }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const clearData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }




  const saveUser = async () => {
    let formData = {
      name: name,
      email: email,
      password: password,
      phone: phone
    }

    let response = await userService.saveUser(formData);
    if (response.status === 201) {
      console.log("saved !")
      this.clearData()
    } else {
      console.log(response.data)
    }

    // fetch('http://127.0.0.1:4000/user', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     email: email,
    //     password: password,
    //     phone: phone
    //   })
    // })
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
            <Input value={name} onChangeText={(e) => { setName(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={(e) => { setEmail(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={password} onChangeText={(e) => { setPassword(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" value={confirmPassword} onChangeText={(e) => { setConfirmPassword(e) }} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={saveUser}>
            Register
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}