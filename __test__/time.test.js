import Time from '../src/time';

describe('Time', () => {
  let cell;
  let boardMock;

  describe('#tick', () => {
    beforeEach(() => {
      cell = {
        livingNeighbours: () => [],
        live: () => 'alive',
        die: () => 'dead',
        prepareToLive: () => 'alive',
        prepareToDie: () => 'dead',
        nextMove: () => 'move',
      };
      boardMock = {
        cells: () => [cell],
      };
    });

    describe('the tick giveth', () => {
      it('tells cells with exactly 3 living neighbours to live', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3'];
        const spy = jest.spyOn(cell, 'prepareToLive');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not tell cells with less than 3 living neighbours to live', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2'];
        const spy = jest.spyOn(cell, 'prepareToLive');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not tell cells with more than 3 living neighbours to live', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3', 'Neighbour4'];
        const spy = jest.spyOn(cell, 'prepareToLive');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
    });

    describe('the tick taketh away', () => {
      it('tells cells with fewer than 2 living neighbours to die', () => {
        cell.livingNeighbours = () => ['Neighbour1'];
        const spy = jest.spyOn(cell, 'prepareToDie');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('tells cells with more than three living neighbours to die', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3', 'Neighbour4'];
        const spy = jest.spyOn(cell, 'prepareToDie');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not tell cells with 2 living neighbours to die', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2'];
        const spy = jest.spyOn(cell, 'prepareToDie');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not tell cells with 3 living neighbours to die', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3'];
        const spy = jest.spyOn(cell, 'prepareToDie');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
    });

    describe('the ticks will be done', () => {
      it('calls next move of cells', () => {
        const spy = jest.spyOn(cell, 'nextMove');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
