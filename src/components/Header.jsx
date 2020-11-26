import HeaderButton from './HeaderButton';
import HeaderCheckbox from './HeaderCheckbox';
import HeaderNumberInput from './HeaderNumberInput';

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
        {!gameRunning && <HeaderNumberInput name="rows" value={numberOfRows} onChange={onSizeInputChange} />}
        {!gameRunning && <HeaderNumberInput name="cols" value={numberOfColumns} onChange={onSizeInputChange} />}
        {!gameRunning && <HeaderButton onClick={onResize} text="Resize" />}
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        {!gameRunning && <HeaderNumberInput />}
        {!gameRunning && <HeaderButton text="Change interval" />}
      </form>
      <div>
        {!gameRunning && <HeaderCheckbox name="colorGradient" label="Color gradient"
          checked={enableColorGradient} onClick={onColorGradient} />}
      </div>
      <div>
        {!gameRunning && <HeaderButton onClick={onClear} text="Clear" />}
        <HeaderButton onClick={onStartOrStop} text={gameRunning ? 'Stop' : 'Start'} />
      </div>
    </header>
  );
};

export default Header;