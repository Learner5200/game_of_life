import Board from '../src/board';

describe('Board', () => {
  const CellMock = jest.fn();
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
      expect(board.cells()).toBe(board.grid.flatten);
    });
  });
});
