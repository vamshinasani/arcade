import React from 'react'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { GiTicTacToe } from "react-icons/gi";  
import { TbChartGridDotsFilled } from "react-icons/tb";  
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import "./Home.css"
function Home() {
    const navigate = useNavigate()
    const selectRandom = ()=>{  
        const games = ["tictactoe","dotsandconnect"]
        navigate("./"+games[Math.floor(Math.random()*games.length)])
    }
  return (
    <div className='homeBackground'>
        <a href='./tictactoe'><button className='btn btn-lg mx-3 btn-light p-4 border rounded-3'>TIC <GiTicTacToe /></button></a>
        <a href='./dotsandconnect'><button className='btn btn-lg mx-3 btn-light p-4 border rounded-3'>DOTS <TbChartGridDotsFilled /></button></a>
        <button className='btn btn-lg mx-3 btn-light p-4 border rounded-3' onClick={()=>selectRandom()}>Random <GiPerspectiveDiceSixFacesRandom /></button>
    </div>
  )
}

export default Home