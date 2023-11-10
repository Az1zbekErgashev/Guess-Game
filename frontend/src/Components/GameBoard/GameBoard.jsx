import React, { useState, useRef, useEffect } from 'react'
import './game.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function GameBoard() {
    const naviagte = useNavigate()
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [inputValues, setInputValues] = useState(['', '', '', '']);
    const [isStart, setIsStart] = useState(true)
    const [game, setGame] = useState([])
    const [GuessGame, setGuessGame] = useState([])
    const [history, setHistory] = useState([])
    const notify = () => {

    }
    const isLetterNumber = (letter) => {
        return isNaN(parseInt(letter));
    };
    const handleInputChange = (index, event) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        if (isLetterNumber(event.target.value)) {
            toast.error("Заполните поля правильно !")
            newInputValues[index] = ""
            setInputValues(newInputValues)
        }
        setInputValues(newInputValues);
        if (event.target.value === '') {
            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        } else if (index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleDelete = (index) => {
        const newInputValues = [...inputValues];

        setInputValues(newInputValues);
        isLetterNumber(index)
        if (index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };
    const startGame = async () => {
        setIsStart(true)
        var newInputValues = [...inputValues];
        newInputValues = ['', '', '', '']
        setInputValues(newInputValues)
        let email = sessionStorage.getItem("email")
        console.log(email);
        let api = `https://localhost:7245/api/Game/start?email=${email}`
        await axios.post(api)
            .then(res => {
                let gameBtn = document.getElementById("start-Game")
                gameBtn.setAttribute("disabled", "")
                let PlayBtn = document.getElementById("play-game")
                PlayBtn.removeAttribute("disabled")
                setGame(res.data);
                setGuessGame(res.data?.guessGame)
                setHistory(res.data?.guessGame?.history)
                toast.info(" Игра началась!")
            })
    }
    const playGame = async () => {
        console.log(inputValues.length);
        let api = `https://localhost:7245/api/Game/${game.id}/guess`
        await axios.post(api, inputValues)
            .then(res => {
                setGame(res.data);
                setGuessGame(res.data?.guessGame)
                setHistory(res.data?.guessGame?.history)
                if (res.data.isGameOver === true) {
                    let gameBtn = document.getElementById("start-Game")
                    gameBtn.removeAttribute("disabled")
                    let PlayBtn = document.getElementById("play-game")
                    PlayBtn.setAttribute("disabled", "")
                    setIsStart(false)
                }
            })
            .catch(e => {
                toast.error("Надо писать все цифры !")
            })
    }
    const nextPage = () =>{
        naviagte("/history")
    }
    useEffect(() => {
        let gameBtn = document.getElementById("play-game")
        gameBtn.setAttribute("disabled", "")
    }, [])
    return (
        <div className='game-board-main'>
            <h5 onClick={nextPage} className='history'>History</h5>
            <ToastContainer
                autoClose={100}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <div className='game-board'>
                <div className='game-col'>
                    {inputValues.map((value, index) => (
                        <input
                            maxLength={1}
                            key={index}
                            ref={inputRefs[index]}
                            value={value}
                            onChange={(e) => { handleInputChange(index, e); notify() }}
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace' && value === '') {
                                    handleDelete(index);
                                }
                            }}
                        />
                    ))}
                </div>
                <div className='game-col-alert game-col'>
                    <div>
                        <h4>P and M : {GuessGame.result === null ? "Начни играть 🙃" : GuessGame.result}</h4>
                    </div>
                    <div>
                        ❤️{game.remainingAttempts}
                    </div>
                </div>
                <div className='game-col'>
                    <div className='secretNumber'>
                        {isStart ? "?" : game?.numbers}
                    </div>
                </div>

                <div className='game-col'>
                    <button id='play-game' onClick={playGame}>Play</button>
                    <button id='start-Game' onClick={startGame}>Start new Game</button>
                </div>
            </div>
        </div>
    )
}
