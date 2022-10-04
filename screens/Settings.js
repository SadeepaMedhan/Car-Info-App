import React, { useState } from 'react'
import { Button, HStack, Text, VStack } from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Settings({id,navigation}) {
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    //console.log(id);
    getUser(id);
  },
    []);

  const getUser = async (id) => {
    try {
      const response = await fetch('http://192.168.8.102:4000/user/' + id);
      const u = await response.json();
      setUser(u);
      //console.log(u);
    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <VStack space={4} justifyContent="center">
      <HStack m='5' space={4} justifyContent="center">
        <Text>IMG</Text>
        <FontAwesomeIcon icon="fa-solid fa-sliders" />
        <VStack>
        <Text>{user!==null?user.name:"none"}</Text>
        <Text>{user!==null?user.email:"none"}</Text>
        
      <Button mt="2"  onPress={() => { navigation.navigate("updateUser", { user: user }) }}>View Profile</Button>
        </VStack>
      </HStack>
      <Button>Connection</Button>
    </VStack>
  )
}
