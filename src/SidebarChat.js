import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import db from "./firebase"
import { addDoc, collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { Link } from 'react-router-dom';


function SidebarChat({addNewChat, name, id}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");


    useEffect(() =>{
        if (id){
            const messageRef = collection(db, "rooms", id, "messages")
            const q = query(messageRef, orderBy("timestamp", 'desc'))   
            const unsub = onSnapshot(q, (snapshot) =>
            setMessages(snapshot.docs.map((doc) =>({
                ...doc.data()
            })))) 
           return unsub;
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[])


    const createChat = async()=>{
        const roomname = prompt("please enter name for the chat");
        
        if(roomname){
            const collectionRef = collection(db, "rooms")
            const payload = { UserName: roomname}
            const docRef = await addDoc(collectionRef, payload)
        }
    };

    
    return !addNewChat ? (
        <Link to = {`/rooms/${id}`} >
            <div className = "sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>

        </div>
        </Link>
        
    ): (
        <div onClick = {createChat}className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
