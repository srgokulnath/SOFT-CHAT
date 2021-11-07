import { Avatar, IconButton } from '@material-ui/core'
import React,{ useEffect, useState} from 'react'
import "./Chatbar.css"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons'
import MicIcon from "@material-ui/icons/Mic"
import { useParams } from 'react-router-dom'
import db from "./firebase"
import { addDoc, collection, doc, onSnapshot, orderBy, query, Timestamp } from '@firebase/firestore'
import userEvent from '@testing-library/user-event'
import { useStateValue } from './StateProvider'
// import firebase from 'firebase'
function Chatbar() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    
    console.log(messages)


    useEffect(() => {
        if(roomId) {
            onSnapshot(doc(db, "rooms", roomId), doc=>{
                setRoomName(doc.data().UserName)
            })
            
            const messageRef = collection(db, "rooms", roomId, "messages")
            const q = query(messageRef, orderBy("timestamp", 'asc'))   
            const unsub = onSnapshot(q, (snapshot) =>
            setMessages(snapshot.docs.map((doc) =>({
                ...doc.data()
            })))) 
           return unsub;
         }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[])

    const sendMessage = async(e)=>{
        e.preventDefault();
        // console.log(input);
        const collectionRef = collection(db, "rooms", roomId, "messages")
        const payload = {
            message: input,
            name: user.displayName,
            timestamp: Timestamp.now(),
        }
        const docRef = await addDoc(collectionRef, payload)

        setInput("");
    }

 
    return (
        <div className = "chatbar">
            <div className="chatbar__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chatbar__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chatbar__headerRight">
                    <IconButton>
                        <SearchOutlined className="alpha"/>
                        
                     </IconButton>  
                     <IconButton>
                         <AttachFile  className="alpha"/>
                        
                     </IconButton> 
                     <IconButton>
                         <MoreVertIcon className="alpha"/>
                     </IconButton>
                </div>
            </div>
            <div className="charbar__body">
                {messages.map((message) =>(
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className = "chat__name">~{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>                    
                </p>
                ))}
                
            </div>

            <div className="charbar__footer">
                <InsertEmoticon className="chatbar__footerEmoji"/>
                <form className="charbar__footerForm">
                    <input value={input} onChange={e => setInput(e.target.value)}       className="chatbar__footerFormInput" type="text" placeholder = "Type a message"/>
                    
                    <button className = "chatbar__footerFormButton" type="submit" onClick = {sendMessage}></button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>    
            </div>

        </div>
    )
}

export default Chatbar
