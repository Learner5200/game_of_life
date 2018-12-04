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
    return this.grid.flatten;
  }

  _createGrid() {
    const grid = [];
    for (let i = 0; i < this.height; i += 1) {
      grid.push([]);
    }
    grid.forEach((row) => {
      for (let i = 0; i < this.width; i += 1) {
        row.push(new this.CellClass());
      }
    });
    return grid;
  }
}
