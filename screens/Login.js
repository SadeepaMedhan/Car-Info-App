import React, { useEffect, useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Link, Button, HStack, Text, CloseIcon } from "native-base";
import Connection from '../Connection';
import { Alert, Keyboard } from 'react-native';
import Input from '../components/Input';

export default function Login({ navigation }) {

  const [list, setList] = useState([]);
  const [user, setUser] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [id, setId] = useState('');

  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    getAll();
  }, []);
  
  const getAll = async () => {
    try {
      const response = await fetch(Connection().url + 'user');
      const uList = await response.json();
      setList(uList);
    } catch (error) {
      console.error(error);
    }
  }


  const validate = () => {
    Keyboard.dismiss();
    let valid = false;
    let selectUser = null;
    if (!inputs.email) {
      handleError('Please input email', 'email')
      valid = false;
    } else {
      
      list.map((u) => {
        if (u.email === inputs.email) {
          setUser(u);
          selectUser = u;
        }
      })
      if (selectUser === null) {
        handleError('Invalid email', 'email')
        valid = false;
      } else {
        if (!inputs.password) {
          handleError('Please input password', 'password')
          valid = false;
        } else if (selectUser.password === inputs.password) {
          setId(selectUser._id);
          navigation.navigate("Home", { user_id: selectUser._id })
          valid = true;
        } else {
          handleError('Invalid password', 'password')
          valid = false;
        }
      }

    }

    return valid;
  };


  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  }
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  }

  

  const onSubmit = () => {
    validate() ? console.log('done') : console.log('Validation Failed');
  };

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
          {/* <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
            <Input borderRadius="30" placeholder="john@email.com"
              onChangeText={value => setData({ ...formData, email: value })}
            />
            {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
            <Input type="password" borderRadius="30" placeholder="******"
              onChangeText={value => setData({ ...formData, password: value })}
            />
            {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>} */}


          {/* <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1" onPress={() => Alert.alert('Sorry! This feature is not available')}>
              Forget Password?
            </Link>
          </FormControl> */}
          <Input label="Email" iconName="email-outline"
            placeholder="Enter your email address"
            onChangeText={text => handleOnChange(text, 'email')}
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email')
            }}
          />
          <Input password label="Password" iconName="lock-outline"
            placeholder="Enter your password"
            onChangeText={text => handleOnChange(text, 'password')}
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password')
            }}
          />

          <Button borderRadius="30" mt="2" colorScheme="indigo" onPress={onSubmit}>
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