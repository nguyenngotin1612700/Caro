
// eslint-disable-next-line import/no-unresolved
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Board from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(400).fill(null),
                type: null,
                pos: -1
            }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            wasWin: null,
            sortMovesAsc: true,
            moveChoose: -1,
        };
    }

    handlePlayAgain = () => {
        this.setState({
            history: [{
                squares: Array(400).fill(null),
                type: null,
                pos: -1
            }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            wasWin: null,
            moveChoose: -1,
        });
    };

    handleSortMove = () => {
        const { sortMovesAsc } = this.state;
        this.setState({
            sortMovesAsc: !sortMovesAsc
        });
    };

    handleClick(i) {
        const { winner, xIsNext, stepNumber } = this.state;
        let { history } = this.state;
        history = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || winner) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        const checkWin = this.calculateWinner(squares, i);
        if (checkWin) {
            this.setState({
                history: history.concat([{
                    squares,
                    type: squares[i],
                    pos: i
                }]),
                stepNumber: history.length,
                winner: checkWin,
                wasWin: checkWin,
                moveChoose: -1,
            });
            return;
        }
        this.setState({
            history: history.concat([{
                squares,
                type: squares[i],
                pos: i
            }]),
            stepNumber: history.length,
            xIsNext: !xIsNext,
            wasWin: null,
            moveChoose: -1,
        });
    }

    jumpTo(step) {
        const { wasWin, history } = this.state;
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winner: (wasWin && step === history.length - 1) ? wasWin : null,
            moveChoose: step
        });
    }

    calculateWinner(squares, lastNode) {
        return (
            this.checkNgang(squares, lastNode) ||
            this.checkDoc(squares, lastNode) ||
            this.checkCheoChinh(squares, lastNode) ||
            this.checkCheoPhu(squares, lastNode)
        );
    }

    // eslint-disable-next-line class-methods-use-this
    checkNgang(squares, lastNode) {
        const hang = parseInt(lastNode / 20, 10);
        const cot = lastNode % 20;
        let count = 0;
        let chanTrai = false;
        let chanPhai = false;
        const posWin = [lastNode];
        // check Trái
        for (let i = cot - 1; i >= 0; i -= 1) {
            if (squares[hang * 20 + i] === squares[lastNode]) {
                count += 1;
                posWin.push(hang * 20 + i);
            } else if (squares[hang * 20 + i] !== null) {
                chanTrai = true;
                break;
            } else {
                break;
            }
        }

        // check Phải
        for (let i = cot + 1; i <= 19; i += 1) {
            if (squares[hang * 20 + i] === squares[lastNode]) {
                count += 1;
                posWin.push(hang * 20 + i);
            } else if (squares[hang * 20 + i] !== null) {
                chanPhai = true;
                break;
            } else {
                break;
            }
        }
        if (count >= 4 && (!chanTrai || !chanPhai)) {
            return {
                winner: squares[lastNode],
                posWin,
            }
        }
        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    checkDoc(squares, lastNode) {
        const hang = parseInt(lastNode / 20, 10);
        const cot = lastNode % 20;
        let count = 0;
        let chanTren = false;
        const chanDuoi = false;
        const posWin = [lastNode];
        // check Trên
        for (let i = hang + 1; i <= 19; i += 1) {
            if (squares[i * 20 + cot] === squares[lastNode]) {
                count += 1;
                posWin.push(i * 20 + cot);
            } else if (squares[i * 20 + cot] !== null) {
                chanTren = true;
                break;
            } else {
                break;
            }
        }
        // check Dưới
        for (let i = hang - 1; i >= 0; i -= 1) {
            if (squares[i * 20 + cot] === squares[lastNode]) {
                count += 1;
                posWin.push(i * 20 + cot);
            } else if (squares[i * 20 + cot] !== null) {
                chanTren = true;
                break;
            } else {
                break;
            }
        }
        if (count >= 4 && (!chanTren || !chanDuoi)) {
            return {
                winner: squares[lastNode],
                posWin,
            }
        }
        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    checkCheoChinh(squares, lastNode) {
        const hang = parseInt(lastNode / 20, 10);
        let cot = lastNode % 20;
        let count = 0;
        let chanTren = false;
        let chanDuoi = false;
        const posWin = [lastNode];
        // check dưới
        for (let temp = hang - 1; temp >= 0; temp -= 1) {
            cot -= 1;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count += 1;
                posWin.push(temp * 20 + cot);
            } else if (squares[temp * 20 + cot] !== null) {
                chanDuoi = true;
                cot = lastNode % 20;
                break;
            } else {
                cot = lastNode % 20;
                break;
            }
        }

        // check trên
        for (let temp = hang + 1; temp <= 20; temp += 1) {
            cot += 1;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count += 1;
                posWin.push(temp * 20 + cot);
            } else if (squares[temp * 20 + cot] != null) {
                chanTren = true;
                cot = lastNode % 20;
                break;
            } else {
                cot = lastNode % 20;
                break;
            }
        }

        if (count >= 4 && (!chanTren || !chanDuoi)) {
            return {
                winner: squares[lastNode],
                posWin,
            }
        }
        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    checkCheoPhu(squares, lastNode) {
        const hang = parseInt(lastNode / 20, 10);
        let cot = lastNode % 20;
        let count = 0;
        let chanTren = false;
        let chanDuoi = false;
        const posWin = [lastNode];
        // check dưới
        for (let temp = hang - 1; temp >= 0; temp -= 1) {
            cot += 1;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count += 1;
                posWin.push(temp * 20 + cot);
            } else if (squares[temp * 20 + cot] != null) {
                chanDuoi = true;
                cot = lastNode % 20;
                break;
            } else {
                cot = lastNode % 20;
                break;
            }
        }
        // check trên
        for (let temp = hang + 1; temp <= 20; temp += 1) {
            cot -= 1;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count += 1;
                posWin.push(temp * 20 + cot);
            } else if (squares[temp * 20 + cot] != null) {
                chanTren = true;
                cot = lastNode % 20;
                break;
            } else {
                cot = lastNode % 20;
                break;
            }
        }
        if (count >= 4 && (!chanTren || !chanDuoi)) {
            return {
                winner: squares[lastNode],
                posWin,
            }
        }
        return null;
    }

    render() {
        const { history, stepNumber, winner, xIsNext, moveChoose, sortMovesAsc } = this.state;
        const current = history[stepNumber];
        let status;
        if (winner) {
            status = `Player ${winner.winner} Winnnnnnnnn, Click play again to continues `;
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }
        const moves = history.map((move, idx) => {
            const desc = idx ? `go to move ${idx} -- ${move.type} check in (${Math.floor(move.pos / 20) + 1}, ${move.pos % 20 + 1}) ` : 'go to game start';
            const fontWeight = moveChoose === idx ? "bold" : "normal"
            return (
                <li>
                    <button type="button" style={{ fontWeight }} onClick={() => this.jumpTo(idx)} className="btn btn-outline-success">{desc}</button>
                </li>
            )
        })
        if (!sortMovesAsc) {
            moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div>Nguyễn Ngô Tín - 1612700</div>
                    <div>Phát triển ứng dụng web nâng cao</div>
                </div>
                <div className="game-board">
                    <Board squares={current.squares} posWin={winner ? winner.posWin : null}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button type="button" className="btn btn-primary" onClick={this.handleSortMove}>
                        Sort Moves
                    </button>
                    <ol >{moves}</ol>
                    <button type="button" className="btn btn-danger" onClick={this.handlePlayAgain}>
                        Play Again
                </button>
                </div>
            </div>
        )
    }
}
export default Game