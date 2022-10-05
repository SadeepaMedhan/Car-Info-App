import React, { useEffect, useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, IconButton, CloseIcon } from "native-base";
import Connection from '../Connection';
import { Alert } from 'react-native';

export default function Login({ navigation }) {
  
  const [list, setList] = useState([]);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    getAll();
  },[]);
  const getAll = async () => {
    try {
      const response = await fetch(Connection().url+'user');
      const uList = await response.json();
      setList(uList);
    } catch (error) {
      console.error(error);
    }
  }
  const login = () => {
    if (email !== '') {
      if (password !== '') {
        list.map((user) => {
          if (user.email === email) {
            if (user.password === password) {
              setId(user._id);
              //console.log(id);
              setEmail('');
              setPassword('');
              navigation.navigate("Home", { user_id: user._id })
            }
          }
        })
        getAll();
      } else {
        Alert.alert("Invalid Password!")
      }
    } else {
      Alert.alert("Invalid E-mail address!")
    }
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input borderRadius="30" value={email} onChangeText={(e) => { setEmail(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input borderRadius="30" type="password" value={password} onChangeText={(e) => { setPassword(e) }} />
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1" onPress={() =>  Alert.alert('Sorry! This feature is not available')}>
              Forget Password?
            </Link>
          </FormControl>
          <Button borderRadius="30" mt="2" colorScheme="indigo" onPress={login}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={() => { navigation.navigate("SignUp") }}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}