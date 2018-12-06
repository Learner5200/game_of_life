import Board from '../../src/board';
import Time from '../../src/time';

let board;
let spy;

beforeEach(() => {
  board = new Board({
    width: 3,
    height: 3,
  });
  spy = jest.spyOn(console, 'log');
});

afterEach(() => {
  spy.mockRestore();
});

describe('cells die when supposed to', () => {
  test('single cell will die off after one tick', () => {
    board.setup([0, 0]);
    expect(spy).toHaveBeenCalledWith('X O O \nO O O \nO O O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O O O \nO O O \nO O O \n');
  });

  test('cells with only one neighbour will die off after one tick', () => {
    board.setup([0, 0], [0, 1]);
    expect(spy).toHaveBeenCalledWith('X X O \nO O O \nO O O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O O O \nO O O \nO O O \n');
  });

  test('cell with four neighbours will die off after one tick', () => {
    board.setup([1, 1], [0, 1], [1, 0], [1, 2], [2, 1]);
    expect(spy).toHaveBeenCalledWith('O X O \nX X X \nO X O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('X X X \nX O X \nX X X \n');
  });

  test('cell with three neighbours will not die off after one tick', () => {
    board.setup([1, 1], [0, 1], [1, 0], [1, 2]);
    expect(spy).toHaveBeenCalledWith('O X O \nX X X \nO O O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('X X X \nX X X \nO X O \n');
  });
});

describe('cells spawn when supposed to', () => {
  test('dead cell with three neighbours will spawn after one tick', () => {
    board.setup([0, 1], [1, 0], [1, 2]);
    expect(spy).toHaveBeenCalledWith('O X O \nX O X \nO O O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O X O \nO X O \nO O O \n');
  });
  test('dead cell with two neighbours will not spawn after one tick', () => {
    board.setup([0, 1], [1, 0]);
    expect(spy).toHaveBeenCalledWith('O X O \nX O O \nO O O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O O O \nO O O \nO O O \n');
  });
  test('dead cell with four neighbours will not spawn after one tick', () => {
    board.setup([0, 1], [1, 0], [1, 2], [2, 1]);
    expect(spy).toHaveBeenCalledWith('O X O \nX O X \nO X O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O X O \nX O X \nO X O \n');
  });
});

describe('patterns', () => {
  test('three cells in a row display blinker pattern', () => {
    board.setup([0, 1], [1, 1], [2, 1]);
    expect(spy).toHaveBeenCalledWith('O X O \nO X O \nO X O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O O O \nX X X \nO O O \n');
    Time.tick(board);
    expect(spy).toHaveBeenCalledWith('O X O \nO X O \nO X O \n');
  });
});
