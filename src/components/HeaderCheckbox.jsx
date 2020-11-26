const HeaderCheckbox = ({ name, label, checked, onClick }) => {
  return (
    <>
      <input type="checkbox" checked={checked}
        onChange={onClick}
        name={name} style={{
          cursor: 'pointer',
        }} />
      <label htmlFor={name} onClick={onClick} style={{
        fontWeight: 'bold',
        fontSize: '18px',
        color: 'lightgrey',
        marginRight: '10px',
        paddingLeft: '5px',
        cursor: 'pointer',
      }}>{label}</label>
    </>
  )
};

export default HeaderCheckbox;