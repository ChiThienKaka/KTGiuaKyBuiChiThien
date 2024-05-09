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
    const {email} = userLogin;

    useEffect(()=>{
        jobs=[];
    },[email])
    
    const getDataFromFirestore = () => {
        return firestore()
          .collection('USERS')
          .doc(email)
          .collection('JOBS')
          .doc('CV')
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              const data = documentSnapshot.data().jobs;
              return data;
            } else {
              console.log('Document does not exist');
              return [];
            }
          })
          .catch((error) => {
            console.error('Error getting data from Firestore:', error);
            return [];
          });
      };
      
      console.log(getDataFromFirestore())


    const handleAddJob = async (textCv) => {
        jobs.push(textCv);
        setTextCv('');
        // Thêm dữ liệu mới vào collection "JOBS" của người dùng
        await firestore().collection('USERS').doc(email).collection('JOBS').doc('CV').set({jobs});
    }
    const goku =['thien','duong']
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', margin:30}}>
            <TextInput value={textCv} onChangeText={setTextCv} style={[styles.input]} placeholderTextColor={'gray'} placeholder="Nhap cong viec"></TextInput>
            <TouchableOpacity style={[styles.button]} onPress={()=>handleAddJob(textCv)}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
        {/* <FlatList data={getDataFromFirestore()} renderItem={({ item }) => (<Text style={[styles.item]}>{item}</Text>)}
      keyExtractor={(item, index) => index.toString()}
    /> */}
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