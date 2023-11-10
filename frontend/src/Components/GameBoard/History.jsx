import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './History.scss'
export default function History(props) {
    const [history, setHistory] = useState([])
    const run = async () => {
        await axios.get("https://localhost:7245/api/History")
            .then(res => {
                setHistory(res.data)
            })
            .catch(e => {

            })
    }
    useEffect(() => {
        run()
    }, [])
    return (
        <div className='game-board-main '>
            <div className='history-board'>
                <table className='tablee table'>
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Game Count</th>
                            <th>Win Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history !== undefined && history?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.userEmail}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.gameCount}</td>
                                    <td>{item.winner}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
