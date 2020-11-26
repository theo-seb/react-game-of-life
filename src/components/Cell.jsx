const Cell = ({
  key,
  onCellClick,
  color,
  size: { height, width }
}) => {
  return (
    <div key={key} onClick={onCellClick} style={{
      backgroundColor: color,
      border: '1px black solid',
      height,
      width,
    }} />
  );
};

export default Cell;