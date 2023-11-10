import React, { useState } from 'react';
import "./Login.scss"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameBoard from '../GameBoard/GameBoard';
import { useNavigate } from 'react-router-dom';

const LoginBoard = () => {
    const [nameVal, setNameVal] = useState("")
    const [emailVal, setEmailVal] = useState("")
    const [passVal, setPassVal] = useState("")
    const navigate = useNavigate()
    const notify = () => {

    }
    const login = async (evt) => {
        evt.preventDefault()
        if (emailVal.includes("@gmail.com") || emailVal.includes("@email.ru")) {
            const UserList = {
                name: nameVal,
                email: emailVal,
                password: passVal
            }
            await axios.post("https://localhost:7245/api/User/login", UserList)
                .then(res => {
                    toast.success("Вы успешно зашли")
                    console.log(res.data);
                    sessionStorage.setItem("email", res.data.email)
                    setInterval(() => {
                        navigate("/game")
                    }, 2500)
                })
                .catch(e => {
                    toast.error("Заполните поля правильно !")

                })
        }
        else {
            toast.error("Заполните поля правильно !")
        }
    }
    return (
        <div>
            <ToastContainer
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <form onSubmit={login} className='form-input-login  container'>
                <div style={{ height: '100vh' }}>
                    <div>
                        <h2>Sing in to WebGame</h2>
                    </div>
                    <div>
                        <p>or use email for sing in</p>
                    </div>
                    <div>
                        <div className='input-block'>
                            <input value={nameVal} onChange={(i) => setNameVal(i.target.value)} required type="text" name="" id="" placeholder='Full Name' />
                            <input value={emailVal} onChange={(i) => setEmailVal(i.target.value)} required type="email" name="" id="" placeholder='Email' />
                            <input value={passVal} onChange={(i) => setPassVal(i.target.value)} required type="password" name="" id="" placeholder='Password' />
                        </div>
                    </div>
                    <div>
                        <p>Forgot password</p>
                    </div>
                    <div>
                        <button onClick={notify} type='submit'>Sing In</button>
                    </div>
                </div>
            </form>
        </div>

    );
};
const Registration = () => {
    const [nameVal, setNameVal] = useState("")
    const [emailVal, setEmailVal] = useState("")
    const [passVal, setPassVal] = useState("")
    const notify = () => {

    }
    const navigate = useNavigate()
    const register = async (evt) => {
        evt.preventDefault()
        if (emailVal.includes("@gmail.com") || emailVal.includes("@email.ru")) {
            const UserList = {
                name: nameVal,
                email: emailVal,
                password: passVal
            }
            await axios.post("https://localhost:7245/api/User/Register", UserList)
                .then(res => {
                    toast.success("Вы прошли регистрацию")
                    console.log(res.data);
                    sessionStorage.setItem("email", res.data.email)
                    setInterval(() => {
                        navigate("/game")
                    }, 2500)
                })
                .catch(e => {
                    toast.error("Заполните поля правильно !")
                })
        }
        else {
            toast.error("Такой пользователь существует !")
        }
    }
    return (
        <div>
            <ToastContainer
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <form onSubmit={register} className='form-input-create form-input-login'>
                <div style={{ height: '100vh' }}>
                    <div>
                        <h2>Create Account</h2>
                    </div>
                    <div>
                        <p>or use email for registration</p>
                    </div>
                    <div >
                        <div className='input-block'>
                            <input value={nameVal} onChange={(i) => setNameVal(i.target.value)} required type="text" name="" id="" placeholder='Full Name' />
                            <input value={emailVal} onChange={(i) => setEmailVal(i.target.value)} required type="email" name="" id="" placeholder='Email' />
                            <input value={passVal} onChange={(i) => setPassVal(i.target.value)} required type="password" name="" id="" placeholder='Password' />
                        </div>
                    </div>
                    <div>
                        <button onClick={notify} type='submit'>Sing Up</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export { LoginBoard, Registration };