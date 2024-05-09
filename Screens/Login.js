import { View, Text, StyleSheet, TouchableOpacity, Alert,TextInput,ActivityIndicator,Image } from 'react-native'
import React, {useContext, useState} from 'react'
import auth from '@react-native-firebase/auth'
import { login,useMyContextController } from '../store/index'

const Login = ({navigation}) => {

    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    console.log(userLogin);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloading, setIsloading] = useState(true);
    const handelSignInt = ()=>{

        

        // setIsloading(false)
        // auth().signInWithEmailAndPassword(email,password)
        // .then(data => {console.log(data), Alert.alert("thanh cong");setIsloading(true)})
        // .catch(e=>{Alert.alert(e.message);setIsloading(true)})
    }
  return (
    <View style={styles.container}>
        {console.log(email,password)}
        <Image style={{alignSelf:'center'}} width={150} height={150} source={{uri:'https://www.gstatic.com/devrel-devsite/prod/vc851b65627ca98cc752c9ae13e5f506cd6dbb7ed1bb4c8df6090c5f9130ed83c/firebase/images/touchicon-180.png'}}></Image>
      <TextInput value={email} style={styles.input} placeholderTextColor={'gray'} onChangeText={setEmail} placeholder='E-mail' />
      <TextInput value={password} secureTextEntry placeholderTextColor={'gray'} style={[styles.input]} onChangeText={setPassword} placeholder='Password' />
      <TouchableOpacity onPress={()=>login(dispatch,email,password,navigation)} style={styles.button}>
            {isloading ? <Text style={{fontWeight:'bold'}}>Login</Text> :
            <ActivityIndicator size="large" color="#ffffff" />}
      </TouchableOpacity>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
          {/* <TouchableOpacity onPress={()=>navigation.navigate("Create")}>
                <Text style={{marginTop:10, fontWeight:'bold'}} >Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Forget")}>
                <Text style={{marginTop:10, fontWeight:'bold'}} >Forget Password</Text>
          </TouchableOpacity> */}
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Create")}>
                <Text style={{fontWeight:'bold', color:'blue'}} > Sign up</Text>
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
        color:'black'
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
export default Login