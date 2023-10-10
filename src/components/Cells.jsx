import { React, useState } from "react";
import Cell from "./Cell";


function Cells (){

    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const cellElements = [];
    const winner = calculateWinner(squares);
    let status;
    

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = 'X';
        } else {
          nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        return check(lines, squares);
    }

    function check(lines, squares){
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    function alertingWinner() {
        if (winner) {
          alert(winner + " WINNNNN!")
          status = "Winner: " + winner;
        } else if(squares.every((square) => square !== null)) {
          alert("draw......")
          status = "Draw!";
        } else {
          status = "Next player: " + (xIsNext ? "X" : "O");
        }
    }

    function generateCells() {
        for (let i = 1; i <= 9; i++) {  
          cellElements.push(<Cell count={"cell-" + i} value={squares[i - 1]} handler={() => handleClick(i - 1)}/>);
        }
    }

    generateCells();
    alertingWinner();
    
  
    return (
        <div className="board">
            <div className="status">{status}</div>
            <div className="cells">{cellElements}</div>
            <br/>
            <button onClick={() => {window.location.reload();}}>Restart the game</button>
        </div>
    );
}

export default Cells;