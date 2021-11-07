import { Avatar, IconButton } from '@material-ui/core'
import DonutLarge  from '@material-ui/icons/DonutLarge'
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from "./firebase"
import { collection, onSnapshot } from '@firebase/firestore'
import { useStateValue } from './StateProvider'





function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    console.log(rooms)

    useEffect(
        ()=> 
        onSnapshot(collection(db,"rooms"),(snapshot)=>
            setRooms(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
        []
    );
 

    
    

    

    
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar  src = {user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge className="alpha"/>
                        
                     </IconButton>  
                     <IconButton>
                         <ChatIcon  className="alpha"/>
                        
                     </IconButton> 
                     <IconButton>
                         <MoreVertIcon className="alpha"/>
                     </IconButton>

                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <input placeholder = "Search or start new chat" type = "text" />
                </div>
                
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key = {room.id}   id = {room.id} name = {room.UserName} />
                ))}

            </div>
        </div>
    )
}

export default Sidebar
