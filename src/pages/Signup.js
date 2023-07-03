import React, {useRef,useState} from 'react';
import { firestore, auth} from '../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import {addDoc, collection} from '@firebase/firestore';
export function Signup(props){
    let username=useRef();
    let password=useRef();
    let ref=collection(firestore,'userData');
    let registeredUsername=useRef();
    let registeredPassword=useRef();
    let [currentUser,setUser]=useState({});
    onAuthStateChanged(auth,(currentUser)=>{setUser(currentUser);})
   async function newSignup(username,password){

            return createUserWithEmailAndPassword(auth,username,password).then(cred=>addDoc(ref,{id:cred.user.uid,pokemon:[],pokemonAbout:[],pokemonPic:[]}));
       
    }
    async function login(username,password){
        return signInWithEmailAndPassword(auth,username,password);
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(registeredUsername.current.value===''||registeredPassword.current.value===''){
        }
        else{
        try{
        let user=await login(registeredUsername.current.value,registeredPassword.current.value);
        props.pageSetter(true);
        }
        catch(e){
            alert('Wrong');
        }
    }
    }
    async function handleNewSubmit(e){
        e.preventDefault();
        if(username.current.value===''||password.current.value===''){
        }
        else{
        try{
        let user=await newSignup(username.current.value,password.current.value);
        props.pageSetter(true);
        }
        catch(e){
            alert('User Already Taken');
        }
    }
    }
    return (
        <>
        <h1>Hi {currentUser?currentUser.email:"User"}</h1>
        <h1>Registered Users</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor='registeredUsername'>Username</label>
        <input name="registeredUsername" type="text" ref={registeredUsername}></input>
        <label htmlFor="registeredPassword">Password</label>
        <input htmlFor="registeredPassword" type='text'ref={registeredPassword}></input>
        <input type="submit"></input>
        </form>
        <h1>New Users</h1>
        <form onSubmit={handleNewSubmit}>
        <label htmlFor='username'>Username</label>
        <input name="username"type="text" ref={username}></input>
        <label htmlFor='password'>Password</label>
        <input type="text" name="password" ref={password}></input>
        <input type="submit"></input>
        </form>
        </>
    )
}