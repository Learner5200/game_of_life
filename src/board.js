import Cell from './cell';
import BoardView from './board_view';

export default class Board {
  constructor({
    width, height, CellClass = Cell, BoardViewClass = BoardView,
  }) {
    this.width = width;
    this.height = height;
    this.CellClass = CellClass;
    this.BoardViewClass = BoardViewClass;
    this.grid = this._createGrid();
    this.boardView = new BoardViewClass(this);
  }

  cells() {
    return this.grid.flat();
  }

  find([row, column]) {
    return this.grid[row][column];
  }

  setup(...coordinates) {
    coordinates.forEach((coordinate) => {
      this.find(coordinate).live();
    });
    this.boardView.render();
  }

  _createGrid() {
    const grid = [];
    for (let rowNum = 0; rowNum < this.height; rowNum += 1) {
      grid.push([]);
      for (let colNum = 0; colNum < this.width; colNum += 1) {
        grid[rowNum].push(new this.CellClass({
          board: this,
          row: rowNum,
          column: colNum,
        }));
      }
    }
    return grid;
  }
}
