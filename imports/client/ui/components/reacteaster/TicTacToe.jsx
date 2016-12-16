import React from 'react';
import './ttt.scss';
/*
███████  ██████  ██    ██  █████  ██████  ███████
██      ██    ██ ██    ██ ██   ██ ██   ██ ██
███████ ██    ██ ██    ██ ███████ ██████  █████
     ██ ██ ▄▄ ██ ██    ██ ██   ██ ██   ██ ██
███████  ██████   ██████  ██   ██ ██   ██ ███████
            ▀▀
*/
const Square = (props) =>
  <button className="square" onClick={() => props.onClick()}>
    {props.value}
  </button>;

  /*
  ██████   ██████   █████  ██████  ██████
  ██   ██ ██    ██ ██   ██ ██   ██ ██   ██
  ██████  ██    ██ ███████ ██████  ██   ██
  ██   ██ ██    ██ ██   ██ ██   ██ ██   ██
  ██████   ██████  ██   ██ ██   ██ ██████
  */
class Board extends React.Component {
  renderSquare(i, j){
      return (<Square
        key={j}
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)} />);
  }

  render() {
    let tauler = this.props.squares;

    let result = tauler.map((linia, indexLinia)=>(
        <div className="board-row" key={indexLinia}>
          { linia.map((columna, indexColumna)=>(
              this.renderSquare(indexLinia, indexColumna)
            ))
          }
        </div>
    ));
    return (
      <div>
        {/* <div className="board-row">
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
        </div> */}
        {result}
      </div>
    );
  }
}

/*
 ██████   █████  ███    ███ ███████
██       ██   ██ ████  ████ ██
██   ███ ███████ ██ ████ ██ █████
██    ██ ██   ██ ██  ██  ██ ██
 ██████  ██   ██ ██      ██ ███████
*/
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(Array(3).fill(null), Array(3).fill(null), Array(3).fill(null))
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i][j]) { // Si el quadre ja té un valor o s'ha guanyat la partida, no es continua amb la jugada.
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //const stepNum = this.state.stepNumber;
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
    const classes = (move === this.state.stepNumber)?"activeMove":"";

      return (
        <li key={move}>
          <a
            className={classes}
            href="#"
            onClick={()=>{this.jumpTo(move);}}>
            {desc}
          </a>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, j) => this.handleClick(i, j)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('container')
// );

 /*
 █████  ██    ██ ██   ██ ██ ██      ██  █████  ██████  ███████
██   ██ ██    ██  ██ ██  ██ ██      ██ ██   ██ ██   ██ ██
███████ ██    ██   ███   ██ ██      ██ ███████ ██████  ███████
██   ██ ██    ██  ██ ██  ██ ██      ██ ██   ██ ██   ██      ██
██   ██  ██████  ██   ██ ██ ███████ ██ ██   ██ ██   ██ ███████
*/
function calculateWinner(squares) {}
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
