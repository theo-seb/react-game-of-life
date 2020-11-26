import { useState, useRef } from 'react';
import Header from './components/Header';

const DEFAULT_COLS = 20;
const DEFAULT_ROWS = 10;
const HEADER_HEIGHT_PX = 60;
const POSSIBLE_NEIGHBOURS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

const copyGrid = (grid) => grid.map((row) => [...row]);

const countAliveNeighbours = (grid, i, j) => {
  return POSSIBLE_NEIGHBOURS.reduce((count, [nI, nJ]) => {
    const neighbourI = i + nI;
    const neighbourJ = j + nJ;
    if (neighbourI >= 0 && neighbourI < grid.length && neighbourJ >= 0 && neighbourJ < grid[0].length) {
      return count + grid[neighbourI][neighbourJ];
    }
    return count;
  }, 0)
};

const getNextCellState = (grid, i, j) => {
  const nbOfAliveNeighbours = countAliveNeighbours(grid, i, j);
  const currState = grid[i][j];
  if (currState && [2, 3].includes(nbOfAliveNeighbours)) return 1; // Any live cell with two or three live neighbours survives
  if (!currState && nbOfAliveNeighbours === 3) return 1; // Any dead cell with three live neighbours becomes a live cell
  return 0; // All other live cells die in the next generation. Similarly, all other dead cells stay dead
};

const getEmptyGrid = (nbRows, nbCols) => {
  return Array(nbRows).fill().map(() => Array(nbCols).fill(0));
};

function App() {
  const [gridSize, setGridSize] = useState({ nbRows: DEFAULT_ROWS, nbCols: DEFAULT_COLS });
  const [grid, setGrid] = useState(getEmptyGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [gameRunning, setGameRunning] = useState(false);
  const [enableColorGradient, setEnableColorGradient] = useState(true);

  const gridRef = useRef(grid);
  gridRef.current = grid;
  const intervalRef = useRef(null);

  const onCellClick = (i, j) => {
    const newGrid = copyGrid(grid);
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  const handleGame = () => {
    if (gameRunning && intervalRef.current) clearInterval(intervalRef.current);
    else {
      intervalRef.current = setInterval(() => {
        const newGrid = copyGrid(gridRef.current);
        for (let i = 0; i < newGrid.length; i++) {
          for (let j = 0; j < newGrid[0].length; j++) {
            newGrid[i][j] = getNextCellState(gridRef.current, i, j);
          }
        }
        setGrid(newGrid);
      }, 200);
    }
    setGameRunning(!gameRunning);
  };

  const clearGrid = () => {
    setGrid(getEmptyGrid(grid.length, grid[0].length));
  };

  const onInputChange = (e) => {
    const prop = e.target.dataset.name === 'rows' ? 'nbRows' : 'nbCols';
    setGridSize({ ...gridSize, [prop]: parseInt(e.target.value, 10) })
  };

  const resizeGrid = () => {
    const newGrid = getEmptyGrid(gridSize.nbRows, gridSize.nbCols);
    setGrid(newGrid);
  };

  const getCellColor = (i, j) => {
    if (!enableColorGradient) return 'black';
    const val = (255 / (grid.length + grid[0].length)) * (i + j);
    return `rgba(${val},${val},${val})`;
  };

  return (
    <>
      <Header 
        headerHeigth={HEADER_HEIGHT_PX}
        gameRunning={gameRunning}
        numberOfRows={gridSize.nbRows}
        numberOfColumns={gridSize.nbCols}
        enableColorGradient={enableColorGradient}
        onResize={resizeGrid}
        onClear={clearGrid}
        onStartOrStop={handleGame}
        onColorGradient={() => { setEnableColorGradient(!enableColorGradient) }}
        onSizeInputChange={onInputChange}
      />
      <div>
        {
          grid.map((row, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'row',
            }}>{
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      backgroundColor: cell ? getCellColor(i, j) : 'white',
                      border: '1px black solid',
                      height: `calc(${100 / grid.length}vh - ${HEADER_HEIGHT_PX / grid.length}px)`,
                      width: `${100 / grid[0].length}vw`,
                    }}
                    onClick={() => onCellClick(i, j)} />
                ))
              }</div>)
          )
        }
      </div>
    </>
  );
}

export default App;
