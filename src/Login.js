import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {provider} from "./firebase"
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn =()=>{
        

        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch((error) => alert(error.message));
    }
    return (
        <div className= "login">
            <div className="login__container">
                <img className= "login__image"
                    src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn5.vectorstock.com%2Fi%2F1000x1000%2F04%2F84%2Fwhatsapp-logo-icon-vector-27990484.jpg&imgrefurl=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fwhatsapp-logo-icon-vector-27990484&tbnid=gYHBrALuLdRuFM&vet=12ahUKEwjnh6n71tPzAhVDoUsFHbwMCdUQMygGegUIARDcAQ..i&docid=SmGL-23J8uhfuM&w=1000&h=1080&q=whatsapp%20logo&ved=2ahUKEwjnh6n71tPzAhVDoUsFHbwMCdUQMygGegUIARDcAQ"
                    alt = "" />
            </div>
            <div className="login__text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button className = "login__button" onClick = {signIn}>
                Sign In with Google
            </Button>
        </div>
    )
}

export default Login
