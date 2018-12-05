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
