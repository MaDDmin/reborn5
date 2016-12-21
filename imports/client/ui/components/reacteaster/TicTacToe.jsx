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

    console.log(`JUGADA: ======================================`);
    console.log(`=== INICI DE VALORS: =====================`);
  		// history és la col.lecció de moviments fins l'actual sense incloure'l
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    console.log(`iniHistory: ${JSON.stringify(history)}`);
    // current és l'últim moviment {squares:[[a,b,c],[d,e,f],[g,h,i]]}
    const current = history[history.length-1];
    console.log(`iniCurrent: ${JSON.stringify(current)}`);
    // squares és una còpia de l'últim moviment
    const squares = current.squares.slice();
    console.log(`iniSquares: ${JSON.stringify(squares)}`);

    if (calculateWinner(squares) || squares[i][j]) { // Si el quadre ja té un valor o s'ha guanyat la partida, no es continua amb la jugada.
      return;
    }

    console.log(`== COMPROVACIONS: ==================`);
    console.log(`Object.is(history, this.state.history): ${Object.is(history, this.state.history)}`);
    console.log(`Object.is(squares, current.squares): ${Object.is(squares, current.squares)}`);
    console.log(`Object.is(squares, history.squares): ${Object.is(squares, history.squares)}`);

    console.log(`squares: ${JSON.stringify(squares)}`);
    console.log(`history.squares: ${JSON.stringify(history.squares)}`);
    console.log(`this.state.history.squares: ${JSON.stringify(this.state.history.squares)}`);

    console.log(`Object.is(squares, this.state.history.squares): ${Object.is(squares, this.state.history.squares)}`);
    console.log(`Object.is(squares, history.squares): ${Object.is(squares, history.squares)}`);

    console.log(`=== VALORS INICIALS: =====================`);

    console.log(`stateHistory: ${JSON.stringify(this.state.history)}`);
    console.log(`currentSquares: ${JSON.stringify(squares)}`);
    console.log(`statexIsNext: ${this.state.xIsNext}`);
    console.log(`statestepNumber: ${this.state.stepNumber}`);
    console.log(`current: ${JSON.stringify(current)}`);

    console.log(`---> historyNoSlicePRE: ${JSON.stringify(current.squares)}`);
    console.log(`---> historyVolgutPRE: ${JSON.stringify(history.concat([{squares}]))}`);
    console.log(`---> squaresIJVolgutPRE: ${JSON.stringify(squares[i][j])}`);
    console.log(`---> squaresIVolgutPRE: ${JSON.stringify(squares[i])}`);
    console.log(`squaresPRE: ${squares}`);
    console.log(`---> iPRE: ${i}`);
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';

    console.log(`HISTORY: ${JSON.stringify(history)}`);
    console.log(`stateHISTORY: ${JSON.stringify(this.state.history)}`);
    console.log(`Object.is(history, this.state.history): ${Object.is(history, this.state.history)}`);
    console.log(`Object.is(history.squares, this.state.history.squares): ${Object.is(history.squares, this.state.history.squares)}`);

    console.log(`squares: ${JSON.stringify(squares)}`);
    console.log(`history.squares: ${JSON.stringify(history.squares)}`);
    console.log(`this.state.history.squares: ${JSON.stringify(this.state.history.squares)}`);


    console.log(`---> iPOST: ${i}`);
    console.log(`squaresPOST: ${squares}`);
    console.log(`---> squaresIVolgutPOST: ${JSON.stringify(squares[i])}`);
    console.log(`---> squaresIJVolgutPOST: ${JSON.stringify(squares[i][j])}`);
    console.log(`---> historyVolgutPOST: ${JSON.stringify(history.concat([{squares}]))}`);
    console.log(`---> historyNoSlicePOST: ${JSON.stringify(current.squares)}`);

        console.log(`== COMPROVACIONS POST: ==================`);
        console.log(`Object.is(squares, current.squares): ${Object.is(squares, current.squares)}`);
        console.log(`Object.is(squares, history.squares): ${Object.is(squares, history.squares)}`);
        console.log(`Object.is(squares, this.state.history.squares): ${Object.is(squares, this.state.history.squares)}`);
        console.log(`Object.is(squares, history.squares): ${Object.is(squares, history.squares)}`);

    this.setState({
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    }, ()=>{ // Tornada quan els valors de l'estat han sigut actualitzats
      console.log(`=== VALORS FINALS: =====================`);

      console.log(`poststateHistory: ${JSON.stringify(this.state.history)}`);
      console.log(`postcurrentSquares: ${JSON.stringify(squares)}`);
      console.log(`poststatexIsNext: ${this.state.xIsNext}`);
      console.log(`poststatestepNumber: ${this.state.stepNumber}`);
      console.log(`postcurrent: ${JSON.stringify(current)}`);

      console.log(`squares: ${JSON.stringify(squares)}`);
      console.log(`history.squares: ${JSON.stringify(history.squares)}`);
      console.log(`this.state.history.squares: ${JSON.stringify(this.state.history.squares)}`);

      console.log(`history: ${JSON.stringify(history)}`);
      console.log(`history.length: ${history.length}`);
      console.log(`Object.is(history[0].squares, history[history.length-1].squares): ${Object.is(history[0].squares, history[history.length-1].squares)}`);
      console.log(`history[0].squares: ${history[0].squares}`);
      console.log(`history[history.length-1].squares: ${history[history.length-1].squares}`);

      console.log(`FI DE JUGADA======================================`);
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
function calculateWinner(squares) {
  const lines = [
    [{linia: 0, columna: 0}, {linia: 0, columna: 1}, {linia: 0, columna: 2}],
    [{linia: 1, columna: 0}, {linia: 1, columna: 1}, {linia: 1, columna: 2}],
    [{linia: 2, columna: 0}, {linia: 2, columna: 1}, {linia: 2, columna: 2}],
    [{linia: 0, columna: 0}, {linia: 1, columna: 0}, {linia: 2, columna: 0}],
    [{linia: 1, columna: 0}, {linia: 1, columna: 1}, {linia: 1, columna: 2}],
    [{linia: 2, columna: 0}, {linia: 2, columna: 1}, {linia: 2, columna: 2}],
    [{linia: 0, columna: 0}, {linia: 1, columna: 1}, {linia: 2, columna: 2}],
    [{linia: 0, columna: 2}, {linia: 1, columna: 1}, {linia: 2, columna: 0}]
  ];
  // for (let i = 0; i < lines.length; i++) {
  //   const [a, b, c] = lines[i];
  //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //     return squares[a];
  //   }
  // }

  lines.map((val, ind)=>{
    const [a, b, c] = val;
  //  console.log(`val: ${JSON.stringify(val)}`);
    // console.log(`a: ${JSON.stringify(a)}`);
    // console.log(`b: ${JSON.stringify(b)}`);
    // console.log(`c: ${JSON.stringify(c)}`);
  //  console.log(`squares[${a.linia}][${a.columna}]: ${squares[a.linia][a.columna]}`);
    if (squares[a.linia][a.columna] && squares[a.linia][a.columna] === squares[b.linia][b.columna] && squares[a.linia][a.columna] === squares[c.linia][c.columna]) {
      console.log(`squares[${a.linia}][${a.columna}]: ${squares[a.linia][a.columna]}`);
      return squares[a.linia][a.columna];
    }
  });

  return null;
}
