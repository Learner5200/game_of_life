export default class Cell {
  constructor({
    board, row, column,
  }) {
    this.board = board;
    this.row = row;
    this.column = column;
    this.isAlive = false;
  }

  live() {
    this.isAlive = true;
  }

  die() {
    this.isAlive = false;
  }

  livingNeighbours() {
    return this._neighbours().filter(cell => cell.isAlive);
  }

  _neighbours() {
    return this.board.cells().filter(cell => this.isAdjacentTo(cell));
  }

  _isAdjacentTo(cell) {
    return (Math.abs(this.row - cell.row) === 1 || Math.abs(this.column - cell.column) === 1);
  }
}
