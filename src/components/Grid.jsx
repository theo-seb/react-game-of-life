import Cell from './Cell';

const Grid = ({
  grid,
  onCellClick,
  getCellColor,
  cellHeight,
  cellWidth,
}) => {
  return (<div>
    {
      grid.map((row, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'row',
        }}>{
            row.map((cell, j) => (
              <Cell key={`${i}-${j}`} onCellClick={() => onCellClick(i, j)}
                color={cell ? getCellColor(i, j) : 'white'} size={{
                  height: cellHeight,
                  width: cellWidth,
                }} />
            ))
          }</div>)
      )
    }
  </div>);
};

export default Grid;