const Cell = ({
  onCellClick,
  color,
  size: { height, width }
}) => {
  return (
    <div onClick={onCellClick} style={{
      backgroundColor: color,
      border: '1px black solid',
      height,
      width,
    }} />
  );
};

export default Cell;