import { POSSIBLE_NEIGHBOURS } from '../constants';

export const copyGrid = (grid) => grid.map((row) => [...row]);

export const countAliveNeighbours = (grid, i, j) => {
    return POSSIBLE_NEIGHBOURS.reduce((count, [nI, nJ]) => {
        const neighbourI = i + nI;
        const neighbourJ = j + nJ;
        if (neighbourI >= 0 && neighbourI < grid.length && neighbourJ >= 0 && neighbourJ < grid[0].length) {
            return count + grid[neighbourI][neighbourJ];
        }
        return count;
    }, 0)
};

export const getNextCellState = (grid, i, j) => {
    const nbOfAliveNeighbours = countAliveNeighbours(grid, i, j);
    const currState = grid[i][j];
    if (currState && [2, 3].includes(nbOfAliveNeighbours)) return 1; // Any live cell with two or three live neighbours survives
    if (!currState && nbOfAliveNeighbours === 3) return 1; // Any dead cell with three live neighbours becomes a live cell
    return 0; // All other live cells die in the next generation. Similarly, all other dead cells stay dead
};

export const getEmptyGrid = (nbRows, nbCols) => {
    return Array(nbRows).fill().map(() => Array(nbCols).fill(0));
};