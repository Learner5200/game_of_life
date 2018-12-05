export default class Time {
  static tick(board) {
    this._decideFates(board);
    this._enactFates(board);
  }

  static _decideFates(board) {
    board.cells().forEach((cell) => {
      this._decideFate(cell);
    });
  }

  static _enactFates(board) {
    board.cells().forEach((cell) => {
      this._enactFate(cell);
    });
  }

  static _decideFate(cell) {
    const neighbours = cell.livingNeighbours().length;
    if (neighbours > 3 || neighbours < 2) cell.prepareToDie();
    if (neighbours === 3) cell.prepareToLive();
  }

  static _enactFate(cell) {
    cell.nextMove();
  }
}
