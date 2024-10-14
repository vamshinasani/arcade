import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./DotsAndConnect.css"
function DotsAndConnect() {
    let [boardSize, setBoardSize] = useState(5)
    let [player, setPlayer] = useState("Blue");
    let [scores, setScores] = useState({ Blue: 0, Red: 0 })
    let [isGameOver, setGameOver] = useState(false)
    let [winner, setWinner] = useState("Draw")
    let [playBoard, setPlayBoard] = useState(new Array(2 * boardSize + 1).fill().map((ele, idx) => {
        let len = 2 * boardSize + 1
        return new Array(len).fill(0)
    }))
    const loadNewBoard = async (size) => {
        let response = window.confirm(`Are you sure, want to laod new board of ${size} X ${size}`)
        if (response) {
            setBoardSize(size)
            setPlayBoard(new Array(2 * size + 1).fill().map((ele, idx) => {
                let len = 2 * size + 1
                return new Array(len).fill(0)
            }))
            setPlayer("Blue")
            setScores({ Blue: 0, Red: 0 })
            setGameOver(false)
            setWinner("Draw")
            let collection = document.getElementsByClassName("horbar");
            for (let i = 0; i < collection.length; i++) collection[i].style.backgroundColor = "white";
            collection = document.getElementsByClassName("verbar");
            for (let i = 0; i < collection.length; i++) collection[i].style.backgroundColor = "white";
            collection = document.getElementsByClassName("plain");
            for (let i = 0; i < collection.length; i++) collection[i].style.backgroundColor = "white";
        }
    }
    const resetGame = () => {
        window.location.reload()
    }
    const playerMove = (rowidx, colidx) => {
        let currentBoard = playBoard;
        if (currentBoard[rowidx][colidx] === 0) {
            currentBoard[rowidx][colidx] = player === "Blue" ? 1 : -1;
            document.getElementById('bar' + rowidx + colidx).style.backgroundColor = player
            currentBoard = checkPlains(currentBoard, player)
            setPlayBoard(currentBoard)
        }
    }
    const changeColor = (rowidx, colidx, barid) => {
        if (playBoard[rowidx][colidx] === 0 && (rowidx % 2 === 0 || colidx % 2 === 0)) {
            let bar = document.getElementById(barid)
            bar.style.backgroundColor = player
        }
    }
    const revertColor = (rowidx, colidx, barid) => {
        if (playBoard[rowidx][colidx] === 0) {
            let bar = document.getElementById(barid)
            bar.style.backgroundColor = "white"
        }
    }
    const checkPlains = (currentBoard, currentPlayer) => {
        var currentscores;
        let playerScored = false;
        for (let i = 1; i < currentBoard.length; i += 2) {
            for (let j = 1; j < currentBoard[i].length; j += 2) {
                if (currentBoard[i][j] === 0) {
                    if (currentBoard[i + 1][j] !== 0 && currentBoard[i - 1][j] !== 0 && currentBoard[i][j + 1] !== 0 && currentBoard[i][j - 1] !== 0) {
                        currentBoard[i][j] = currentPlayer === "Blue" ? 1 : -1
                        currentscores = scores;
                        currentscores[currentPlayer] += 1
                        setScores({ ...scores, currentPlayer: scores[currentPlayer] + 1 })
                        document.getElementById("plain" + i + j).style.backgroundColor = currentPlayer;
                        document.getElementById("bar" + (i + 1) + j).style.backgroundColor = "black";
                        document.getElementById("bar" + i + (j + 1)).style.backgroundColor = "black";
                        document.getElementById("bar" + (i - 1) + j).style.backgroundColor = "black";
                        document.getElementById("bar" + i + (j - 1)).style.backgroundColor = "black";
                        playerScored = true;
                    }
                }
            }
        }
        let tobreak = false;
        for (let i = 1; i < currentBoard.length; i += 2) {
            for (let j = 1; j < currentBoard[i].length; j += 2) {
                if (currentBoard[i][j] === 0) {
                    setGameOver(false)
                    tobreak = true
                    break
                }
            }
            if (tobreak) break;
        }
        if (!tobreak) {
            setGameOver(true)
            if (currentscores.Blue > currentscores.Red) {
                document.body.style.background = "Blue"
                setWinner("BLUE")
            }
            else if (currentscores.Blue < currentscores.Red) {
                document.body.style.background = "Red"
                setWinner("RED")
            }
            else document.body.style.background = "Black"
        }
        if (playerScored) setPlayer(currentPlayer)
        else setPlayer(currentPlayer === "Blue" ? "Red" : "Blue")
        return currentBoard
    }
    return (
        <div className='gameBody'>
            {(!isGameOver) ? <div>
                <h1 className='my-3'>DOTS AND CONNECT</h1>
                <h4>BOARD SIZE </h4>
                <button className='btn btn-success mx-2' onClick={() => loadNewBoard(5)}>5 X 5</button>
                <button className='btn btn-warning mx-2' onClick={() => loadNewBoard(9)}>9 X 9</button>
                <button className='btn btn-danger mx-2' onClick={() => loadNewBoard(11)}>11 X 11</button>
                <div className='d-flex justify-content-around align-items-center m-5'>
                    <div className='d-block m-5'><h1 className='text-primary'>BLUE</h1><h1>{scores?.Blue}</h1></div>
                    <div>
                        {playBoard.map((row, rowidx) => {
                            if (rowidx % 2 === 0) {
                                return (<div className='boardrow' key={"row" + rowidx}>
                                    {row.map((ele, colidx) => {
                                        if (colidx % 2 === 0)
                                            return (<button key={'bar' + rowidx + colidx} className='dot'></button>)
                                        return (<button className='horbar' id={'bar' + rowidx + colidx}
                                            key={'bar' + rowidx + colidx}
                                            onMouseOver={() => changeColor(rowidx, colidx, 'bar' + rowidx + colidx)}
                                            onMouseOut={() => revertColor(rowidx, colidx, 'bar' + rowidx + colidx)}
                                            onClick={() => playerMove(rowidx, colidx, 'bar' + rowidx + colidx)}></button>)
                                    })}
                                </div>)
                            }
                            else {
                                return (<div className='boardrow' key={"row" + rowidx}>
                                    {row.map((ele, colidx) => {
                                        if (colidx % 2 === 0)
                                            return (<button className='verbar'
                                                key={'bar' + rowidx + colidx}
                                                id={'bar' + rowidx + colidx}
                                                onMouseOver={() => changeColor(rowidx, colidx, 'bar' + rowidx + colidx)}
                                                onMouseOut={() => revertColor(rowidx, colidx, 'bar' + rowidx + colidx)}
                                                onClick={() => playerMove(rowidx, colidx, 'bar' + rowidx + colidx)}></button>)
                                        return (<button className='plain' key={'plain' + rowidx + colidx} id={'plain' + rowidx + colidx}></button>)
                                    })}
                                </div>)
                            }
                        })}
                    </div>
                    <div className='d-block m-5'><h1 className='text-danger'>RED</h1><h1>{scores?.Red}</h1></div>
                </div>
            </div> : (winner === "RED" || winner === "BLUE") ?
                <div>
                    <h2 className='breathe'>{winner} IS THE WINNER !</h2>
                    <p onClick={() => resetGame()}>click here to return</p>
                </div> : <div><h2 className='breathe'>DRAW !</h2> <p onClick={() => resetGame()}>click here to return</p></div>}
        </div>
    )
}

export default DotsAndConnect