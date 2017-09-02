import React from 'react'
import Table from './table.jsx'

export default class Field extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      table: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
      count: 16,
      cell: {col: 0, row: 0},
      visibility: 0
    }
  }
  dellCol () {
    if (this.state.table[0].length === 1) return
    let selectCol = this.state.cell.col
    let newTable = this.state.table.map((row) => (row.filter((col, i) => (i !== selectCol))))
    this.setState({table: newTable})
    if (selectCol === newTable[0].length) {
      this.setState({cell: {col: selectCol - 1, row: this.state.cell.row}})
    }
  }
  dellRow () {
    if (this.state.table.length === 1) return
    let selectRow = this.state.cell.row
    let newTable = this.state.table.filter((row, i) => (i !== selectRow))
    this.setState({table: newTable})
    if (selectRow === newTable.length) {
      this.setState({cell: {col: this.state.cell.col, row: selectRow - 1}})
    }
  }
  addCol () {
    let count = this.state.count
    let arr = this.state.table.map((row) => [...row, ++count])
    this.setState({table: arr, count: count})
  }
  addRow () {
    let count = this.state.count
    let newRow = this.state.table[0].map(() => ++count)
    this.setState({table: [...this.state.table, newRow], count: count})
  }
  onSelect (obj) {
    this.setState({cell: obj, visibility: 1})
  }
  onVisibility (vis) {
    this.setState({visibility: vis})
  }
  render () {
    let cell = this.state.cell
    let marginLeft = cell.col * 52 + 55
    let marginTop = cell.row * 52 + 5
    let colVisibility = (this.state.visibility && this.state.table[0].length > 1)
    let rowVisibility = (this.state.visibility && this.state.table.length > 1)
    return (
      <div className="table-app">
        <div className="delete-buttons">
          <div className="delete-buttons__btn delete-buttons__btn_col"
            style={{ opacity: colVisibility ? 1 : 0, marginLeft, visibility: colVisibility ? 'visible' : 'hidden' }}
            onClick={() => this.dellCol()}
            onMouseEnter={() => this.onVisibility(1)}
            onMouseLeave={() => this.onVisibility(0)}
          >-</div>
          <div className="delete-buttons__btn delete-buttons__btn_row"
            style={{opacity: rowVisibility ? 1 : 0, marginTop, visibility: rowVisibility ? 'visible' : 'hidden'}}
            onClick={() => this.dellRow()}
            onMouseEnter={() => this.onVisibility(1)}
            onMouseLeave={() => this.onVisibility(0)}
          >-</div>
        </div>
        <Table onMouseLeave={() => this.onVisibility(0)} onSelect={(obj) => this.onSelect(obj)} table={this.state.table}/>
        <div className="add-buttons">
          <div onClick={() => this.addCol()}
            className="add-buttons__btn add-buttons__btn_col">+</div>
          <div onClick={() => this.addRow()}
            className="add-buttons__btn add-buttons__btn_row">+</div>
        </div>
      </div>
    )
  }
}
