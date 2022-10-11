import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Input = ({label,iconName, error, password, onFocus=()=>{}, ...props }) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    
    return (
    <View style={{marginBottom:20}}>
      <Text style={style.label}>{label}</Text>
      <View style={[style.inputContainer, {borderColor: error ? 'red' :isFocused ? 'blue':'gray'}]}>
        <Icon name={iconName} style={{fontSize:22, color:'blue', marginRight:10 }}/>
        <TextInput secureTextEntry={hidePassword} {...props} style={{flex:1}} onFocus={()=>{
            onFocus();
            setIsFocused(true);
        }}
        onBlur={()=>{
            setIsFocused(false);
        }}/>
        {password && <Icon name={hidePassword ? 'eye-outline' : 'eye-off-outline'} style={{color:'blue', fontSize:22}} 
        onPress={()=>{
            setHidePassword(!hidePassword);
        }}/>}
        
      </View>
      {error && <Text style={{color:'red',fontSize:12,marginTop:7}}>{error}</Text>}
        
    </View>
  )
};
export default Input;

const style = StyleSheet.create({
    label:{
        marginVertical: 5,
        fontSize: 14,
    },
    inputContainer:{
        height:55,
        flexDirection: 'row',
        paddingHorizontal:15,
        borderWidth:0.5,
        alignItems:'center'
    }
}) 