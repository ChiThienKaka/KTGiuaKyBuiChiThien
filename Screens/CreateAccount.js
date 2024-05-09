import { View, Text,TextInput, StyleSheet, TouchableOpacity, Alert , ActivityIndicator, Image} from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { createAccount } from '../store'
const CreateAccount = ({navigation}) => {
  //Tham chieu colections
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isloading, setIsloading] = useState(true);
    const handelSignInt = ()=>{
        setIsloading(false);
        auth().createUserWithEmailAndPassword(em)
        .then(data => {console.log(data); setIsloading(true)})
        .catch(e=>{Alert.alert(e.message); setIsloading(true)})
    }
  return (
    <View style={styles.container}>
        {console.log(email,password)}
        <Image style={{alignSelf:'center'}} width={150} height={150} source={{uri:'https://www.gstatic.com/devrel-devsite/prod/vc851b65627ca98cc752c9ae13e5f506cd6dbb7ed1bb4c8df6090c5f9130ed83c/firebase/images/touchicon-180.png'}}></Image>
      
      <TextInput value={fullName} placeholderTextColor={'gray'} style={styles.input} onChangeText={setFullName} placeholder='Full Name' />
      <TextInput value={email} placeholderTextColor={'gray'} style={styles.input} onChangeText={setEmail} placeholder='E-mail' />
      <TextInput value={password} placeholderTextColor={'gray'} secureTextEntry style={styles.input} onChangeText={setPassword} placeholder='Password' />
      <TextInput placeholderTextColor={'gray'} secureTextEntry style={styles.input} placeholder='Confirm Password' />
      
      <TouchableOpacity onPress={()=>createAccount(email,password,fullName)} style={styles.button}>
            {isloading ? <Text style={{fontWeight:'bold'}}>Create account</Text> :
            <ActivityIndicator size="large" color="#ffffff" />}
      </TouchableOpacity>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Text>Already got an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
              <Text style={{fontWeight:'bold', color:'blue'}} > Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'gray',
        paddingHorizontal:25
    },
    input:{
        backgroundColor:'#ffffff',
        borderRadius:5,
        paddingHorizontal:20,
        marginVertical:10,
        color:'gray'
    },
    button:{
        alignItems:'center',
        backgroundColor:'blue',
        //marginHorizontal:60,
        paddingVertical:10,
        borderRadius:5,
        marginVertical:10
    }
})
export default CreateAccount