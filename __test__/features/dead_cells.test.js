import Board from '../../src/board';
import Time from '../../src/time';

test('single cell will die off after one tick', () => {
  const board = new Board([0, 0]);
  const cell = board.find([0, 0]);
  expect(cell.alive).toBe(true);
  Time.tick();
  expect(cell.alive).toBe(false);
});
