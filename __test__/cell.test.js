import Cell from '../src/cell';

describe('Cell', () => {
  const boardMock = {
    grid: [
      [],
      [],
    ],
    cells: () => boardMock.grid.flat(),
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
  const r1c2 = boardMock.grid[1][2];

  describe('constructor', () => {
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

  describe('#live', () => {
    it('sets isAlive to true', () => {
      r1c2.live();
      expect(r1c2.isAlive).toBe(true);
    });
  });
  describe('#die', () => {
    it('sets isAlive to false', () => {
      r1c2.live();
      r1c2.die();
      expect(r1c2.isAlive).toBe(false);
    });
  });

  describe('#livingNeighbours()', () => {
    it('returns array of living neighbours', () => {
      const living = [
        boardMock.grid[0][0],
        boardMock.grid[0][1],
        boardMock.grid[1][0],
      ];
      const dead = [
        boardMock.grid[0][2],
        boardMock.grid[1][1],
        boardMock.grid[1][2],
      ];
      living.forEach(cell => cell.live());
      living.forEach((cell) => {
        expect(boardMock.grid[1][1].livingNeighbours()).toContain(cell);
      });
      dead.forEach((cell) => {
        expect(boardMock.grid[1][1].livingNeighbours()).not.toContain(cell);
      });
    });
  });

  describe('nextMove', () => {
    it('begins as doNothing', () => {
      expect(r1c2.nextMove).toBe(r1c2.doNothing);
    });
  });

  describe('#prepareToDie', () => {
    it('sets next move to die', () => {
      r1c2.prepareToDie();
      expect(r1c2.nextMove).toBe(r1c2.die);
    });
  });

  describe('#prepareToLive', () => {
    it('sets next move to live', () => {
      r1c2.prepareToLive();
      expect(r1c2.nextMove).toBe(r1c2.live);
    });
  });
});
