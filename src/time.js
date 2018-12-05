export default class Time {
  static tick(board) {
    board.cells().forEach((cell) => {
      this._decideFate(cell);
    });
  }

  static _decideFate(cell) {
    const neighbours = cell.livingNeighbours().length;
    if (neighbours > 3 || neighbours < 2) cell.die();
    if (neighbours === 3) cell.live();
  }
}
