import {useState} from 'react';

const COLUMNS = 20;
const ROWS = 10;

function App() {
  const emptyGrid = Array(ROWS).fill().map((x) => Array(COLUMNS).fill(0));
  const [grid, setGrid] = useState(emptyGrid);

  return (
    <div>
      {
        grid.map((row, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'row',
          }}>{
            row.map((cell, j) => (
              <div key={`${i}-${j}`} style={{
                backgroundColor: cell ? 'black': 'white',
                border: '1px black solid',
                height: '10px',
                width: '10px',
              }} />
            ))
          }</div>)
        )
      }
    </div>
  );
}

export default App;
