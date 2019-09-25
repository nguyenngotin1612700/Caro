import React from 'react'
import Board from './Board'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        this.setState({
            sortMovesAsc: !this.state.sortMovesAsc
        });
    };
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || this.state.winner) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let checkWin = this.calculateWinner(squares, i);
        if (checkWin) {
            this.setState({
                history: history.concat([{
                    squares: squares,
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
                squares: squares,
                type: squares[i],
                pos: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            wasWin: null,
            moveChoose: -1,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winner: (this.state.wasWin && step === this.state.history.length - 1) ? this.state.wasWin : null,
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
    checkNgang(squares, lastNode) {
        const hang = parseInt(lastNode / 20);
        const cot = lastNode % 20;
        let count = 0;
        let chanTrai = false;
        let chanPhai = false;
        const posWin = [lastNode];
        //check Trái
        for (let i = cot - 1; i >= 0; i--) {
            if (squares[hang * 20 + i] === squares[lastNode]) {
                count++;
                posWin.push(hang * 20 + i);
            } else if (squares[hang * 20 + i] !== null) {
                chanTrai = true;
                break;
            } else {
                break;
            }
        }
        //check Phải
        for (let i = cot + 1; i <= 19; i++) {
            if (squares[hang * 20 + i] === squares[lastNode]) {
                count++;
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
    checkDoc(squares, lastNode) {
        const hang = parseInt(lastNode / 20);
        const cot = lastNode % 20;
        let count = 0;
        let chanTren = false;
        let chanDuoi = false;
        const posWin = [lastNode];
        //check Trên
        for (let i = hang + 1; i <= 19; i++) {
            if (squares[i * 20 + cot] === squares[lastNode]) {
                count++;
                posWin.push(i * 20 + cot);
            } else if (squares[i * 20 + cot] !== null) {
                chanTren = true;
                break;
            } else {
                break;
            }
        }
        //check Dưới
        for (let i = hang - 1; i >= 0; i--) {
            if (squares[i * 20 + cot] === squares[lastNode]) {
                count++;
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
    checkCheoChinh(squares, lastNode) {
        const hang = parseInt(lastNode / 20);
        let cot = lastNode % 20;
        let count = 0;
        let chanTren = false;
        let chanDuoi = false;
        const posWin = [lastNode];
        //check dưới
        for (let temp = hang - 1; temp >= 0; temp--) {
            cot--;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count++;
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

        //check trên
        for (let temp = hang + 1; temp <= 20; temp++) {
            cot++;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count++;
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
    checkCheoPhu(squares, lastNode) {
        const hang = parseInt(lastNode / 20);
        let cot = lastNode % 20;
        let count = 0;
        let chanTren = false;
        let chanDuoi = false;
        const posWin = [lastNode];
        //check dưới
        for (let temp = hang - 1; temp >= 0; temp--) {
            cot++;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count++;
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

        //check trên
        for (let temp = hang + 1; temp <= 20; temp++) {
            cot--;
            if (squares[temp * 20 + cot] === squares[lastNode]) {
                count++;
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
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let status;
        if (this.state.winner) {
            status = `Player ${this.state.winner.winner} Winnnnnnnnn, Click play again to continues `;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        const moves = this.state.history.map((move, idx) => {
            let desc = idx ? `go to move ${idx} -- ${move.type} check in (${Math.floor(move.pos / 20) + 1}, ${move.pos % 20 + 1}) ` : 'go to game start';
            let fontWeight = this.state.moveChoose === idx ? "bold" : "normal"
            return (
                <li>
                    <button style={{ fontWeight: fontWeight }} onClick={() => this.jumpTo(idx)} className="btn btn-outline-success">{desc}</button>
                </li>
            )
        })
        if (!this.state.sortMovesAsc) {
            moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div>Nguyễn Ngô Tín - 1612700</div>
                    <div>Phát triển ứng dụng web nâng cao</div>
                </div>
                <div className="game-board">
                    <Board squares={current.squares} posWin={this.state.winner ? this.state.winner.posWin : null}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button className="btn btn-primary" onClick={this.handleSortMove}>
                        Sort Moves
                    </button>
                    <ol >{moves}</ol>
                    <button className="btn btn-danger" onClick={this.handlePlayAgain}>
                        Play Again
                </button>
                </div>
            </div>
        )
    }
}
export default Game