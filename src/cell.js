export default class Cell {
  constructor({
    board, row, column,
  }) {
    this.board = board;
    this.row = row;
    this.column = column;
    this.isAlive = false;
    this.nextMove = this.doNothing;
  }

  live() {
    this.isAlive = true;
  }

  die() {
    this.isAlive = false;
  }

  doNothing() {
    this.isAlive = this.isAlive;
  }

  prepareToDie() {
    this.nextMove = this.die;
  }

  prepareToLive() {
    this.nextMove = this.live;
  }

  prepareToDoNothing() {
    this.nextMove = this.doNothing;
  }

  livingNeighbours() {
    return this._neighbours().filter(cell => cell.isAlive);
  }

  _neighbours() {
    return this.board.cells().filter(cell => this._isAdjacentTo(cell));
  }

  _isAdjacentTo(cell) {
    if (this === cell) return false;
    return (Math.abs(this.row - cell.row) <= 1 && Math.abs(this.column - cell.column) <= 1);
  }
}
