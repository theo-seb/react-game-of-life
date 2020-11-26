import HeaderButton from './HeaderButton';
import HeaderCheckbox from './HeaderCheckbox';
import SizeInput from './SizeInput';

const Header = ({
  headerHeigth,
  gameRunning,
  numberOfRows,
  numberOfColumns,
  enableColorGradient,
  onResize,
  onClear,
  onStartOrStop,
  onColorGradient,
  onSizeInputChange,
}) => {
  return (
    <header style={{
      height: `${headerHeigth}px`,
      backgroundColor: 'black',
      width: '100vw',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <form onSubmit={(e) => e.preventDefault()}>
        {!gameRunning && <SizeInput name="rows" value={numberOfRows} onChange={onSizeInputChange} />}
        {!gameRunning && <SizeInput name="cols" value={numberOfColumns} onChange={onSizeInputChange} />}
        {!gameRunning && <HeaderButton onClick={onResize} text="Resize" />}
      </form>
      <div>
        <HeaderCheckbox name="colorGradient" label="Color gradient"
          checked={enableColorGradient} onClick={onColorGradient} />
        {!gameRunning && <HeaderButton onClick={onClear} text="Clear" />}
        <HeaderButton onClick={onStartOrStop} text={gameRunning ? 'Stop' : 'Start'} />
      </div>
    </header>
  );
};

export default Header;