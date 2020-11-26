import { useState, useRef } from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import { DEFAULT_COLS, DEFAULT_ROWS, HEADER_HEIGHT_PX, DEFAULT_INTERVAL } from './constants';
import { getEmptyGrid, copyGrid, getNextCellState } from './utils/grid';

function App() {
  const [gridSize, setGridSize] = useState({ nbRows: DEFAULT_ROWS, nbCols: DEFAULT_COLS });
  const [grid, setGrid] = useState(getEmptyGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [gameRunning, setGameRunning] = useState(false);
  const [enableColorGradient, setEnableColorGradient] = useState(true);
  const [timeInterval, setTimeInterval] = useState(DEFAULT_INTERVAL);

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
      }, timeInterval);
    }
    setGameRunning(!gameRunning);
  };

  const clearGrid = () => {
    setGrid(getEmptyGrid(grid.length, grid[0].length));
  };

  const onSizeInputChange = (e) => {
    const prop = e.target.dataset.name === 'rows' ? 'nbRows' : 'nbCols';
    setGridSize({ ...gridSize, [prop]: parseInt(e.target.value, 10) })
  };

  const onIntervalInputChange = (e) => {
    setTimeInterval(parseInt(e.target.value, 10));
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
        timeInterval={timeInterval}
        onResize={resizeGrid}
        onClear={clearGrid}
        onStartOrStop={handleGame}
        onColorGradient={() => { setEnableColorGradient(!enableColorGradient) }}
        onSizeInputChange={onSizeInputChange}
        onIntervalInputChange={onIntervalInputChange}
      />
      <Grid grid={grid}
        onCellClick={onCellClick}
        getCellColor={getCellColor}
        cellHeight={`calc(${100 / grid.length}vh - ${HEADER_HEIGHT_PX / grid.length}px)`}
        cellWidth={`${100 / grid[0].length}vw`}
      />
    </>
  );
}

export default App;
