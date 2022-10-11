import React, { useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Input, Button, Icon } from "native-base";
import Connection from '../Connection';

export default function SignUp({ navigation }) {
  const url = Connection().url;

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});



  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({
        ...errors,
        name: 'Name is required.'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short.'
      });
      return false;
    }

    if (formData.email === undefined || formData.email === "") {
      setErrors({
        ...errors,
        email: 'Email is required.'
      });
      return false;
    }
    if (formData.phone === undefined || formData.phone === "") {
      setErrors({
        ...errors,
        phone: 'Phone number is required.'
      });
      return false;
    }
    if (formData.password === undefined || formData.password === "") {
      setErrors({
        ...errors,
        password: 'Password is required.'
      });
      return false;
    } else if (formData.password.length < 5) {
      setErrors({
        ...errors,
        password: 'The password field must be at least 5 characterrs.'
      });
      return false;
    }

    if (formData.confirmPassword === undefined || formData.confirmPassword === "") {
      setErrors({
        ...errors,
        confirm_password: 'Password Confirm is required'
      });
      return false;
    } else if (formData.confirmPassword !== formData.password) {
      setErrors({
        ...errors,
        confirm_password: 'The Password confirmation does not match.'
      });
      return false;
    }
    setErrors({})
    return true;
  };

  const onSubmit = () => {
    validate() ? saveUser() : console.log('Validation Failed');
  };


  const saveUser = async () => {
    let userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    }

    console.log(userData);
    const promise = new Promise((resolve, reject) => {
      fetch(url + 'user', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ userData })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson === "Saved!") {
            //clear
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

          <FormControl isRequired isInvalid={'name' in errors}>
            <FormControl.Label _text={{ bold: true }}>Name</FormControl.Label>
            <Input borderRadius="30" placeholder="John"
              onChangeText={value => setData({ ...formData, name: value })}
            />
            {'name' in errors && <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
            <Input borderRadius="30" placeholder="john@email.com"
              onChangeText={value => setData({ ...formData, email: value })}
            />
            {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={'phone' in errors}>
            <FormControl.Label _text={{ bold: true }}>Phone</FormControl.Label>
            <Input borderRadius="30" placeholder="07XXXXXXXX" keyboardType='numeric'
              onChangeText={value => setData({ ...formData, phone: value })}
            />
            {'phone' in errors && <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
            <Input type="password" borderRadius="30" placeholder="aH3@k6lrp"
              onChangeText={value => setData({ ...formData, password: value })}
            />
            {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={'confirm_password' in errors}>
            <FormControl.Label _text={{ bold: true }}>Confirm Password</FormControl.Label>
            <Input type="password" borderRadius="30" placeholder="aH3@k6lrp"
              onChangeText={value => setData({ ...formData, confirmPassword: value })}
            />
            {'confirm_password' in errors && <FormControl.ErrorMessage>{errors.confirm_password}</FormControl.ErrorMessage>}
          </FormControl>

          <Button borderRadius="30" mt="2" colorScheme="indigo" onPress={onSubmit}>
            Register
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}



