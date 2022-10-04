import React, { useEffect, useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, Alert, IconButton, CloseIcon } from "native-base";

export default function Login({ navigation }) {

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("Poor internet connection.");
  const [list, setList] = useState([]);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    getAll();
  },[]);
  const getAll = async () => {
    try {
      const response = await fetch('http://192.168.8.102:4000/user');
      const uList = await response.json();
      setList(uList);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  }
  const login = () => {
    if (email !== '') {
      if (password !== '') {
        list.map((user) => {
          if (user.email === email) {
        setShow(false);
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
        setShow(true);
      } else {
        setMsg("Invalid Password!")
        setShow(true);
      }
    } else {
      setMsg("Invalid E-mail address!")
      setShow(true);
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
            <Input value={email} onChangeText={(e) => { setEmail(e) }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={password} onChangeText={(e) => { setPassword(e) }} />
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1" onPress={() => setShow(true)}>
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={login}>
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

      {show && <Alert w="100%" status="warning">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {msg}
              </Text>
            </HStack>
            <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" />} _icon={{
              color: "coolGray.600"
            }} onPress={() => setShow(false)} />
          </HStack>
        </VStack>
      </Alert>
      }
    </Center>
  )
}