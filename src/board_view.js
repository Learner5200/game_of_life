export default class BoardView {
  constructor(board) {
    this.board = board;
  }

  render() {
    let display = '';
    this.board.grid.forEach((row) => {
      row.forEach((cell) => {
        display += ((cell.isAlive ? 'X ' : 'O '));
      });
      display += '\n';
    });
    console.log(display);
  }
}
