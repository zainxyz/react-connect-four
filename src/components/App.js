import React, { Component } from 'react';

import 'components/App.css';
import Row from 'components/Row';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: 1,
      board: [],
      boardRows: 6,
      boardColumns: 7,
      colors: {
        cellOuter: '#ccc',
        default: 'white',
        player_1: 'blue',
        player_2: 'green',
      },
      gameFinished: false,
      maxMatch: 4,
      player_1: 1,
      player_2: 2,
    };
  }

  componentWillMount() {
    this.buildBoard();
  }

  /**
   * Build a connect-four board with a given set of board dimensions
   * @method buildBoard
   */
  buildBoard = () => {
    const board = [];
    const { activePlayer, boardColumns, boardRows, player_1, } = this.state;

    for (let rowCell = 0; rowCell < boardRows; rowCell += 1) {
      let singleRow = [];
      for (let columnCell = 0; columnCell < boardColumns; columnCell += 1) {
        singleRow.push(null);
      }
      board.push(singleRow);
    }

    this.setState({
      activePlayer: player_1,
      board,
      gameFinished: false,
      message: `Player ${activePlayer}'s turn`,
    });
  };

  /**
   * Switch between the current two players
   * @method switchPlayer
   * @return {number}
   */
  switchPlayer = () => {
    const { activePlayer, player_1, player_2, } = this.state;
    const active = activePlayer === player_1 ? player_2 : player_1;

    this.setState({
      activePlayer: active,
      message: `Player ${active}'s turn`,
    });

    return active;
  };

  isVertical = grid => {
    const { boardColumns, boardRows, } = this.state;

    for (let r = 3; r < boardRows; r++) {
      for (let c = 0; c < boardColumns; c++) {
        if (grid[r][c]) {
          if (
            grid[r][c] === grid[r - 1][c] &&
            grid[r][c] === grid[r - 2][c] &&
            grid[r][c] === grid[r - 3][c]
          ) {
            return grid[r][c];
          }
        }
      }
    }
  };

  isHorizontal = grid => {
    const { boardColumns, boardRows, } = this.state;

    for (let r = 0; r < boardRows; r++) {
      for (let c = 0; c < boardColumns - 3; c++) {
        if (grid[r][c]) {
          if (
            grid[r][c] === grid[r][c + 1] &&
            grid[r][c] === grid[r][c + 2] &&
            grid[r][c] === grid[r][c + 3]
          ) {
            return grid[r][c];
          }
        }
      }
    }
  };

  isDiagonal = grid => {
    return this.isDiagonalRight(grid) || this.isDiagonalLeft(grid);
  };

  isDiagonalLeft = grid => {
    const { boardColumns, boardRows, } = this.state;

    for (let r = 3; r < boardRows; r++) {
      for (let c = 3; c < boardColumns; c++) {
        if (grid[r][c]) {
          if (
            grid[r][c] === grid[r - 1][c - 1] &&
            grid[r][c] === grid[r - 2][c - 2] &&
            grid[r][c] === grid[r - 3][c - 3]
          ) {
            return grid[r][c];
          }
        }
      }
    }
  };

  isDiagonalRight = grid => {
    const { boardColumns, boardRows, } = this.state;

    for (let r = 3; r < boardRows; r++) {
      for (let c = 0; c < boardColumns - 3; c++) {
        if (grid[r][c]) {
          if (
            grid[r][c] === grid[r - 1][c + 1] &&
            grid[r][c] === grid[r - 2][c + 2] &&
            grid[r][c] === grid[r - 3][c + 3]
          ) {
            return grid[r][c];
          }
        }
      }
    }
  };

  isDraw = grid => {
    const { boardColumns, boardRows, } = this.state;

    for (let row = 0; row < boardRows; row++) {
      for (let column = 0; column < boardColumns; column++) {
        if (grid[row][column] === null) {
          return null;
        }
      }
    }
    return 'draw';
  };

  winnerWinnerChickenDinner = grid => {
    return (
      this.isHorizontal(grid) || this.isVertical(grid) || this.isDiagonal(grid) || this.isDraw(grid)
    );
  };

  connectFour = colIdx => {
    const { activePlayer, boardRows, gameFinished, player_1, player_2, } = this.state;

    if (!gameFinished) {
      let board = this.state.board;
      for (let rowIdx = boardRows - 1; rowIdx >= 0; rowIdx -= 1) {
        if (!board[rowIdx][colIdx]) {
          board[rowIdx][colIdx] = activePlayer;
          break;
        }
      }

      let result = this.winnerWinnerChickenDinner(board);
      if (result === player_1) {
        this.setState({ board, gameFinished: true, message: 'Player 1 wins!', });
      } else if (result === player_2) {
        this.setState({ board, gameFinished: true, message: 'Player 2 wins!', });
      } else if (result === 'draw') {
        this.setState({ board, gameFinished: true, message: 'Draw! (no winner)', });
      } else {
        this.setState({ board, activePlayer: this.switchPlayer(), });
      }
    } else {
      this.setState({ message: 'Game Over, please start a new game!', });
    }
  };

  render() {
    const { board, colors, message, } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Connect Four</h2>
        </div>
        <div className="App-intro">
          <button className="btn btn-outline-primary" onClick={() => this.buildBoard()}>
            New Game
          </button>
          <table style={{ margin: '0 auto', borderSpacing: '0px 0px', }}>
            <thead />
            <tbody>
              {board.map((row, idx) => (
                <Row key={idx} row={row} play={this.connectFour} colors={colors} />
              ))}
            </tbody>
            <tfoot />
          </table>
        </div>
        <p style={{ textAlign: 'center', fontSize: '21px', }}>{message}</p>
      </div>
    );
  }
}

export default App;
