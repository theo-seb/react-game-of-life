import { useState } from 'react';

const COLUMNS = 20;
const ROWS = 10;
const HEADER_HEIGHT_PX = 60;

function App() {
  const emptyGrid = Array(ROWS).fill().map((x) => Array(COLUMNS).fill(0));
  const [grid, setGrid] = useState(emptyGrid);

  const onCellClick = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = !newGrid[i][j];
    setGrid(newGrid);
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
        <button style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: 'lightgrey',
          textAlign: 'center',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '18px',
        }}>Start</button>
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
