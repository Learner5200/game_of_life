import Board from '../../src/board';
import Time from '../../src/time';
import Cell from '../../src/cell';

let board;

beforeEach(() => {
  board = new Board({
    width: 10,
    height: 10,
    CellClass: Cell,
  });
});

describe('cells die when supposed to', () => {
  test('single cell will die off after one tick', () => {
    board.setup([0, 0]);
    const cell = board.find([0, 0]);
    expect(cell.isAlive).toBe(true);
    Time.tick(board);
    expect(cell.isAlive).toBe(false);
  });

  test('cell with only one neighbour will die off after one tick', () => {
    board.setup([0, 0], [0, 1]);
    const cell = board.find([0, 0]);
    const cell2 = board.find([0, 1]);
    expect(cell.isAlive).toBe(true);
    expect(cell2.isAlive).toBe(true);
    Time.tick(board);
    expect(cell.isAlive).toBe(false);
    expect(cell2.isAlive).toBe(false);
  });

  test('cell with four neighbours will die off after one tick', () => {
    board.setup([1, 1], [0, 1], [1, 0], [1, 2], [2, 1]);
    const cell = board.find([1, 1]);
    expect(cell.isAlive).toBe(true);
    Time.tick(board);
    expect(cell.isAlive).toBe(false);
  });

  test('cell with three neighbours will not die off after one tick', () => {
    board.setup([1, 1], [0, 1], [1, 0], [1, 2]);
    const cell = board.find([1, 1]);
    expect(cell.isAlive).toBe(true);
    Time.tick(board);
    expect(cell.isAlive).toBe(true);
  });
});

describe('cells spawn when supposed to', () => {
  test('dead cell with three neighbours will spawn after one tick', () => {
    board.setup([0, 1], [1, 0], [1, 2]);
    const cell = board.find([1, 1]);
    expect(cell.isAlive).toBe(false);
    Time.tick(board);
    expect(cell.isAlive).toBe(true);
  });
  test('dead cell with two neighbours will not spawn after one tick', () => {
    board.setup([0, 1], [1, 0]);
    const cell = board.find([1, 1]);
    expect(cell.isAlive).toBe(false);
    Time.tick(board);
    expect(cell.isAlive).toBe(false);
  });
  test('dead cell with four neighbours will not spawn after one tick', () => {
    board.setup([0, 1], [1, 0], [1, 2], [2, 1]);
    const cell = board.find([1, 1]);
    expect(cell.isAlive).toBe(false);
    Time.tick(board);
    expect(cell.isAlive).toBe(false);
  });
});

describe('patterns', () => {
  test('three cells in a row display blinker pattern', () => {
    board.setup([0, 1], [1, 1], [2, 1]);
    expect(board.find([0, 1]).isAlive).toBe(true);
    expect(board.find([1, 1]).isAlive).toBe(true);
    expect(board.find([2, 1]).isAlive).toBe(true);
    expect(board.find([1, 0]).isAlive).toBe(false);
    expect(board.find([1, 2]).isAlive).toBe(false);
    Time.tick(board);
    expect(board.find([1, 0]).isAlive).toBe(true);
    expect(board.find([1, 1]).isAlive).toBe(true);
    expect(board.find([1, 2]).isAlive).toBe(true);
    expect(board.find([0, 1]).isAlive).toBe(false);
    expect(board.find([2, 1]).isAlive).toBe(false);
    Time.tick(board);
    expect(board.find([0, 1]).isAlive).toBe(true);
    expect(board.find([1, 1]).isAlive).toBe(true);
    expect(board.find([2, 1]).isAlive).toBe(true);
    expect(board.find([1, 0]).isAlive).toBe(false);
    expect(board.find([1, 2]).isAlive).toBe(false);
  });
});