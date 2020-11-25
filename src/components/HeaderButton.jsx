const HeaderButton = ({onClick, text}) => {
    return (
        <button onClick={onClick} style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: 'lightgrey',
            textAlign: 'center',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
        }}>{text}</button>
    );
};

export default HeaderButton;