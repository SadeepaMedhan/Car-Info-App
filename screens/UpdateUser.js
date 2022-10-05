import React, { useState } from 'react'
import { Center, Box, Heading, VStack, FormControl, Input, Button, HStack } from "native-base";
import Connection from '../Connection';

export default function UpdateUser({ route, navigation }) {
    React.useEffect(() => {
        setData(route.params.user);
    }, []);
    const url = Connection().url;
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const setData = (user) => {
        setId(user._id)
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setPassword(user.password);
    }

    const update = async () => {
        if (name !== "") {
            let formData = {
                name: name,
                email: email,
                password: password,
                phone: phone
            }

            const promise = new Promise((resolve, reject) => {
                fetch(url+'user/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ formData })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        if (responseJson === "Updated!") {
                            navigation.navigate("Settings", { id: id })
                        }
                    })
                    .catch((er) => {
                        console.log('error: ' + er);
                        return resolve(er)
                    })
            })
            return await promise
        }
    }
    const deleteUser = () => {
        fetch(url+'user/' + id, {
            method: 'DELETE',
        }).then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json === "Deleted!") {
                    navigation.navigate("Login")
                }
            });
    }
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
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
                    <HStack mt='2' justifyContent="flex-end" space={4}>
                        <Button w='100' colorScheme="danger" onPress={deleteUser}>Remove</Button>
                        <Button w='100' colorScheme="gray" onPress={update}>Update</Button>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}