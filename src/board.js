export default class Board {
  constructor({
    width, height, CellClass,
  }) {
    this.width = width;
    this.height = height;
    this.CellClass = CellClass;
    this.grid = this._createGrid();
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
