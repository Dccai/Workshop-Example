import React,{useState,useEffect, useRef} from "react";
import {auth,firestore} from "../firebase";
import {signOut,onAuthStateChanged} from 'firebase/auth';
import {collection,getDocs,where,query,data,updateDoc,doc} from "firebase/firestore"
import "./MainPage.css";
export function Main(props){
    let [user,setUser]=useState({});
    let docID=useRef('');
    let ref=collection(firestore,'userData');
useEffect(()=>{let authenti=onAuthStateChanged(auth,async (currentUser)=>{
     let q= query(ref,where("id","==",currentUser.uid));
    let data=await getDocs(q);
    docID.current=data.docs[0].id;
    console.log(docID.current);
    setUser(data.docs[0].data());
});
return authenti;},[]);
async function handleSubmit(e){
    e.preventDefault();
    let form =new FormData(e.currentTarget);
    let data=Object.fromEntries(form);
    await updateDoc(doc(ref,docID.current),{pokemon:[...user.pokemon,data.name],pokemonAbout:[...user.pokemonAbout,data.about],pokemonPic:[...user.pokemonPic,data.picture]});
}
return (
    <>
<h1>
    Pokedex
</h1>
<div className="pokemonGrid">
{user.pokemon?user.pokemon.map((a,h)=>{
return <><div className="card"key={h}><h1>{a}</h1><br/><img src={user.pokemonPic[h]}></img><p>{user.pokemonAbout[h]}</p></div></>
}):'Loading...'}</div>

<form onSubmit={handleSubmit}>
    <label htmlFor="name">Pokemon</label>
    <input name="name" type="text"></input>
    <label htmlFor="picture">Pokemon Picture</label>
    <input name="picture" type="text"></input>
    <label htmlFor="about">About</label>
    <input name="about"></input>
    <input type="submit"></input>
</form>
<form onSubmit={(e)=>{signOut(auth)}}>
    <label htmlFor="submit">Log Out</label>
    <input name="submit"type="submit"></input>
</form>
</>
);
}
