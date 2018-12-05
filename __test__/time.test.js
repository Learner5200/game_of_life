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
      };
      boardMock = {
        cells: () => [cell],
      };
    });

    describe('the tick giveth', () => {
      it('resurrects cells with exactly 3 living neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3'];
        const spy = jest.spyOn(cell, 'live');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not resurrect cells with less than three neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2'];
        const spy = jest.spyOn(cell, 'live');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not resurrect cells with more than three neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3', 'Neighbour4'];
        const spy = jest.spyOn(cell, 'live');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
    });

    describe('the tick taketh away', () => {
      it('kills cells with fewer than 2 living neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1'];
        const spy = jest.spyOn(cell, 'die');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('kills cells with more than 3 living neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3', 'Neighbour4'];
        const spy = jest.spyOn(cell, 'die');
        Time.tick(boardMock);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not kill cells with 2 living neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2'];
        const spy = jest.spyOn(cell, 'die');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
      it('does not kill cells with 3 living neighbours', () => {
        cell.livingNeighbours = () => ['Neighbour1', 'Neighbour2', 'Neighbour3'];
        const spy = jest.spyOn(cell, 'die');
        Time.tick(boardMock);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
    });
  });
});
