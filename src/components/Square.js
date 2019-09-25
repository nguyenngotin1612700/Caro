import React from 'react'

class Square extends React.Component {
    render() {
        const { posWin, value, position } = this.props
        let color = "black";
        if (posWin) {
            if (posWin.indexOf(position) !== -1) {
                color = "red";
            }
        }
        // let color = "red";
        return (
            <button style={{ color: color }} className="square" onClick={this.props.onClick}>
                {value}
            </button>
        );
    }
}
export default Square;