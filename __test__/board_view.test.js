import BoardView from '../src/board_view';

describe('BoardView', () => {
  let boardView;
  let boardMock;
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  beforeEach(() => {
    cell1 = { isAlive: true };
    cell2 = { isAlive: false };
    cell3 = { isAlive: false };
    cell4 = { isAlive: true };
    boardMock = {
      grid: [
        [cell1, cell2],
        [cell3, cell4],
      ],
    };
    boardView = new BoardView(boardMock);
  });
  describe('#render', () => {
    it('renders the cells to the console', () => {
      const spy = jest.spyOn(console, 'log');
      boardView.render();
      expect(spy).toHaveBeenCalledWith('X O \nO X \n');
    });
  });
});
