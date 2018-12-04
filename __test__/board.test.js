import Board from '../src/board';

describe('Board', () => {
  class CellMock {
    live() {}
  }
  const board = new Board({
    width: 20,
    height: 10,
    CellClass: CellMock,
  });
  describe('.grid', () => {
    it('has the height specified', () => {
      expect(board.grid.length).toBe(10);
    });
    it('has the width specified', () => {
      expect(board.grid[0].length).toBe(20);
    });
    it('contains cells of class specified', () => {
      expect(board.grid[0][0]).toBeInstanceOf(CellMock);
    });
  });
  describe('#cells', () => {
    it('returns all elements in grid', () => {
      expect(board.cells()).toEqual(board.grid.flat());
    });
  });
  describe('#find', () => {
    it('find element from co-ordinates', () => {
      expect(board.find([4, 5])).toBe(board.grid[4][5]);
    });
  });
  describe('#setup', () => {
    it('brings life to cells at given co-ordinates', () => {
      const spy = jest.spyOn(board.find([0, 0]), 'live');
      board.setup([0, 0]);
      expect(spy).toHaveBeenCalled();
    });
    it('does not bring life to other cells', () => {
      const spy = jest.spyOn(board.find([0, 1]), 'live');
      board.setup([0, 0]);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
