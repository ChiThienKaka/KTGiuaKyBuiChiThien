import {createContext, useContext, useMemo, useReducer} from "react"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native"
const MyContext = createContext()
//displayName
MyContext.displayName = "My store"
//Reducer
const reducer = (state, action)=>{
    switch (action.type)
    {
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
        case "LOGOUT":
            return {...state, userLogin: null}
        case "ADDJOB":
            return {...state, jobs: action.jobs}
        default : {
            throw new Error("Action ko ton tai")
        }
    }
}
//MyContext
const MyContextControllerProvider = ({children})=> {
    const initialState= {
        userLogin: null,
        jobs:[]
    }
    const [controller, dispatch] = useReducer(reducer, initialState)
    const value = useMemo (()=> [controller, dispatch],[controller, dispatch])
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}
//
const useMyContextController= () => {
    const context = useContext (MyContext)
    if(!context)
    {
        throw new Error("useMyContextProvider phai dat trong MyContextControllerProvider")
    }
    return context
}
//Tham chieu colections
const USERS = firestore().collection("USERS")

// Dinh nghia action
const createAccount= (email, password, fullName )=>{
    auth().createUserWithEmailAndPassword (email, password)
    .then(()=>{
        Alert.alert("Tao tai khoan thanh cong voi email: " + email)
        USERS.doc(email)
        .set(
            {
                email,
                password,
                fullName,
            }
        )
    })
    .catch(e => console.log(e.message))
}

const login = (dispatch, email, password,navigation) =>{
    auth().signInWithEmailAndPassword (email, password)
    .then(()=>{
        USERS.doc(email)
        .onSnapshot(u => {
            if(u.exists)
            {
                    console.log("Dang nhap thanh cong voi :" + u.id)
                    dispatch({type: "USER_LOGIN", value: u.data()})
                    navigation.navigate("Home");
            }
        })
    })
    .catch(e => Alert.alert("Sai email va password"))
}




const logout = (dispatch) =>{
    auth().signOut()
    .then(()=>dispatch({type: "LOGOUT"}))
}
export {
    MyContextControllerProvider,
    useMyContextController,
    createAccount,
    login,
    logout,
}