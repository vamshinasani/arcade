import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { GrPowerReset } from "react-icons/gr";
import "./TicTacToe.css"
function TicTacToe() {
    let [board, setBoardField] = useState(new Array(3).fill().map((ele, idx) => new Array(3).fill(0)))
    let [turn, setTurn] = useState("X")
    let [winner, setWinner] = useState("V")
    const reset = () =>{
        window.location.reload()
    }
    const checkDraw = (arr) =>{
        let count = 0
        if(winner === "V")
        {
            for(let i=0;i<arr.length;i++)
                for(let j=0;j<arr[i].length;j++)
                    if(arr[i][j] === -1 || arr[i][j] === 1) count+=1
            if(count === 9)
            {
                setWinner("D")
                document.body.style.background = "#A2D2FF"
            }
        }
    }
    const checkWinner = () => {
        const arr = board
        for (let i = 0; i < 3; i++) {
            let rowSum = 0;
            for (let j = 0; j < 3; j++) {
                rowSum += arr[i][j];
            }
            if (rowSum === 3)
            {
                setWinner("O")
                document.body.style.backgroundColor = "#F9DC5C"
                return 0
            }
            else if (rowSum === -3)
            {
                setWinner("X");
                document.body.style.backgroundColor = "#E84855"
                return 0;
            }
         
        }
        for (let i = 0; i < 3; i++) {
            let colSum = 0;
            for (let j = 0; j < 3; j++) {
                colSum += arr[j][i];
            }
            if (colSum === 3)
            {
                setWinner("O")
                document.body.style.backgroundColor = "#F9DC5C";
                return 0;
            }
            else if (colSum === -3)
            {
                setWinner("X");
                document.body.style.backgroundColor = "#E84855"
                return 0;
            }

        }

        if (arr[0][0] + arr[1][1] + arr[2][2] === 3)
        {
            setWinner("O")
            document.body.style.backgroundColor = "#F9DC5C";
            return 0;
        }
        else if (arr[0][0] + arr[1][1] + arr[2][2] === -3)
        {
            setWinner("X");
            document.body.style.backgroundColor = "#E84855"
            return 0;
        }

        if (arr[2][0] + arr[1][1] + arr[0][2] === 3)
        {
            setWinner("O")
            document.body.style.backgroundColor = "#F9DC5C";
            return 0;
        }
        else if (arr[2][0] + arr[1][1] + arr[0][2] === -3)
        {
            setWinner("X");
            document.body.style.backgroundColor = "#E84855"
            return 0;
        }
        checkDraw(arr)
        return 0
    }
    function setBoard(x, y) {
        setBoardField(() => {
            if (board[x][y] === 0) {
                board[x][y] = (turn === "X") ? -1 : 1
                let box = document.getElementById("box" + x + y)
                box.innerText = `${turn}`
                box.style.backgroundColor = (turn === "X") ? "#E84855" : "#F9DC5C"
                if (turn === "X") setTurn("O")
                else setTurn("X")
            }
            checkWinner()
            return board
        })
    }
    return (
        <div className='gameBody'>
            {winner === "V" ?<div> <h1>TIC-TAC-TOE</h1> <div className='d-flex justify-content-center align-items-center'>
                <button className='field text-light' id='box00' onClick={() => setBoard(0, 0) }></button>
                <button className='field text-light' id='box01' onClick={() => setBoard(0, 1) }></button>
                <button className='field text-light' id='box02' onClick={() => setBoard(0, 2) }></button>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='field text-light' id='box10' onClick={() => setBoard(1, 0) }></button>
                <button className='field text-light' id='box11' onClick={() => setBoard(1, 1) }></button>
                <button className='field text-light' id='box12' onClick={() => setBoard(1, 2) }></button>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='field text-light' id='box20' onClick={() => setBoard(2, 0) }></button>
                <button className='field text-light' id='box21' onClick={() => setBoard(2, 1) }></button>
                <button className='field text-light' id='box22' onClick={() => setBoard(2, 2) }></button>
            </div>
            <button onClick={reset} className='btn btn-danger btn-lg m-3'>Reset <GrPowerReset /></button>
            </div> : (winner === "X" || winner === "O") ? 
            <div>
                <h2 className='breathe'>{winner} IS THE WINNER !</h2>
                <p onClick={()=>reset()}>click here to return</p>
            </div> : <div><h2 className='breathe'>DRAW !</h2> <p onClick={()=>reset()}>click here to return</p></div> }
        </div>
    )
}

export default TicTacToe