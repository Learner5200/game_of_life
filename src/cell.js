export default class Cell {
  constructor({
    board, row, column,
  }) {
    this.board = board;
    this.row = row;
    this.column = column;
    this.isAlive = false;
  }
}
