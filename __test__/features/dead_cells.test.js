import Board from '../../src/board';
import Time from '../../src/time';
import Cell from '../../src/cell';

test('single cell will die off after one tick', () => {
  const board = new Board({
    width: 10,
    height: 10,
    CellClass: Cell,
  });
  board.setup([0, 0]);
  const cell = board.find([0, 0]);
  expect(cell.isAlive).toBe(true);
  Time.tick(board);
  expect(cell.isAlive).toBe(false);
});
