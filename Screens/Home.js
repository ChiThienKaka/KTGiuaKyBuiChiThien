import { View, Text, TextInput, StyleSheet, TouchableOpacity, InputAccessoryView, FlatList } from 'react-native'
import firestore from'@react-native-firebase/firestore'
import React, { Component, useEffect, useState } from 'react'
import { useMyContextController} from '../store'
import { getActionFromState } from '@react-navigation/native'

const Home = () => {
    
    const [textCv, setTextCv] = useState('');
    [jobs, setJobs] = useState([]);
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const {email, fullName} = userLogin;
    let arrayData = [];
    ref = firestore().collection('USERS').doc(email).collection('JOBS').doc('CV');

    useEffect(()=>{
        jobs=arrayData;
        console.log(userLogin)
    },[email])
    
    
    


    const handleAddJob = async (textCv) => {
        jobs.push(textCv);
        setTextCv('');
        // Thêm dữ liệu mới vào collection "JOBS" của người dùng
        await firestore().collection('USERS').doc(email).collection('JOBS').doc('CV').set({jobs});
    }

    useEffect(()=>{
        ref.onSnapshot(querySnapshot=>{
            querySnapshot.data().jobs.forEach(element => {
                arrayData.push(element);
            });
        }, error => {
            console.error('Error occurred:', error);
            // Xử lý lỗi tại đây
        })
        
    })


    const goku =['thien','duong']
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', margin:30}}>
            <TextInput value={textCv} onChangeText={setTextCv} style={[styles.input]} placeholderTextColor={'gray'} placeholder="Nhap cong viec"></TextInput>
            <TouchableOpacity style={[styles.button]} onPress={()=>handleAddJob(textCv)}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
        <FlatList data={arrayData} renderItem={({ item }) => (<Text style={[styles.item]}>{item}</Text>)}
      keyExtractor={(item, index) => index.toString()}
    />
        <Text style={{backgroundColor:'#ffffff', flex:0,fontSize:25,fontWeight:'bold',textAlign:'center', color:'black'}}>User: {fullName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#d4d4d2',
        flex:1
    },
    button:{
        backgroundColor:'blue',
        padding:10,
        flex:0
    },
    input:{
        color:'gray',
        backgroundColor:'#ffffff',
        flex:1
    },
    item:{
        marginHorizontal:20, 
        marginTop:5,color:'#000000', 
        fontSize:25,
        fontWeight:'bold',
       borderBottomWidth:1,
        padding:10,
    }
})

export default Home