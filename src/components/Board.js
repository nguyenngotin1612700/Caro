import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
        const { squares, onClick, posWin } = this.props;
        return <Square value={squares[i]} onClick={() => onClick(i)} posWin={posWin} position={i} />;
    }

    render() {
        const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        const column = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        return (
            <div>
                {row.map(elemRow => {
                    return (
                        <div className="board-row">
                            {column.map(elemColumn => {
                                return this.renderSquare(elemRow * 20 + elemColumn);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Board;
