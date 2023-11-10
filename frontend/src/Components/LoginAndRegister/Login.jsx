import React, { useEffect, useState } from 'react';
import "./Login.scss"
import { LoginBoard, Registration } from './LoginBoard';
const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [useEmail, setUserEmail] = useState(sessionStorage.getItem("email"))
    const toggleForum = () => {
        if (isSignIn) setIsSignIn(false)
        else setIsSignIn(true)
    }
    useEffect(()=>{
            toggleForum()
    },[sessionStorage.getItem("email")])
    console.log(useEmail);
    return (
        <div className='main'>
            <div className='gifImage'>
                <img src="https://media3.giphy.com/media/LESpNIDaNBUcRIPzng/200w.gif?cid=6c09b952ntvhm7undqaiqqc3ot3d8fcwaz1gw93vi739pgwa&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" />
            </div>
            <div className=" user-forum">
                <div className={`${isSignIn ? "translate-context-left" : ""} form-context`} >
                    <div>

                        <div>
                            {isSignIn ? <h2>Hello Friend !</h2> : <h2>Welcome Back !</h2>}
                        </div>
                        <div>
                            {isSignIn ? <p>Enter your personal details and start journey with us</p> : <p>To keep connected with us please login with your personal info</p>}
                        </div>
                        <div>
                            {isSignIn ? <button onClick={toggleForum}>Sing In</button> : <button onClick={toggleForum}>Sing Up</button>}
                        </div>
                    </div>
                </div
                >
                <div className={`${isSignIn ? "form-input-left" : ""} form-input`}>
                    {isSignIn ? <Registration /> : <LoginBoard />}
                </div>
            </div>
        </div>

    );
};


export default Login;