import { useState, useRef } from 'react';

const COLUMNS = 20;
const ROWS = 10;
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
    if (neighbourI >= 0 && neighbourI < ROWS && neighbourJ >= 0 && neighbourJ < COLUMNS) {
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

function App() {
  const emptyGrid = Array(ROWS).fill().map((x) => Array(COLUMNS).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [gameRunning, setGameRunning] = useState(false);

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const onCellClick = (i, j) => {
    const newGrid = copyGrid(grid);
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  let interval;

  const handleGame = () => {
    if (gameRunning) {
      if (interval) clearInterval(interval);
    } else {
      interval = setInterval(() => {
        const newGrid = copyGrid(gridRef.current);
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLUMNS; j++) {
            newGrid[i][j] = getNextCellState(gridRef.current, i, j);
          }
        }
        setGrid(newGrid);
      }, 200);
    }
    setGameRunning(!gameRunning);
  };

  return (
    <>
      <header style={{
        height: `${HEADER_HEIGHT_PX}px`,
        backgroundColor: 'black',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <button onClick={handleGame} style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: 'lightgrey',
          textAlign: 'center',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '18px',
        }}>{gameRunning ? 'Stop' : 'Start'}</button>
      </header>
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
                      backgroundColor: cell ? 'black' : 'white',
                      border: '1px black solid',
                      height: `calc(${100 / ROWS}vh - ${HEADER_HEIGHT_PX / ROWS}px)`,
                      width: `${100 / COLUMNS}vw`,
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
