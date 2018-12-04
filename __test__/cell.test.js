import Cell from '../src/cell';

describe('Cell', () => {
  const boardMock = {
    grid: [
      [],
      [],
    ],
  };
  for (let i = 0; i < 3; i += 1) {
    boardMock.grid[0].push(new Cell({
      board: boardMock,
      row: 0,
      column: i,
    }));
    boardMock.grid[1].push(new Cell({
      board: boardMock,
      row: 1,
      column: i,
    }));
  }
  describe('constructor', () => {
    const r1c2 = boardMock.grid[1][2];
    it('sets row', () => {
      expect(r1c2.row).toBe(1);
    });
    it('sets column', () => {
      expect(r1c2.column).toBe(2);
    });
    it('sets isAlive to false', () => {
      expect(r1c2.isAlive).toBe(false);
    });
  });
});
