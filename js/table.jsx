import React from 'react'
export default class Table extends React.Component {
  render () {
    let rows = this.props.table.map((row, i) => {
      let cols = row.map((col, j) => (
        <td className="field__square"
          onMouseOver={() => this.props.onSelect({row: i, col: j})}
          key={col} ></td>
      ))
      return (<tr className="field__row"
        key={i} >{cols}</tr>)
    })
    return (
      <table className="field"
        onMouseLeave={() => this.props.onMouseLeave()}>
        <tbody className="field__body">
          {rows}
        </tbody>
      </table>
    )
  }
}
