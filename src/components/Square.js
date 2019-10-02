import React from 'react'

function Square(props) {
    const { posWin, value, position, onClick } = props
    let color = "black";
    if (posWin) {
        if (posWin.indexOf(position) !== -1) {
            color = "red";
        }
    }
    // let color = "red";
    return (
        <button type="button" style={{ color }} className="square" onClick={onClick}>
            {value}
        </button>
    );
}
export default Square;