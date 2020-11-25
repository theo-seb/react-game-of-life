const SizeInput = ({value, onChange}) => {
    return (
        <input type="number" value={value}
            onChange={onChange} style={{
                margin: '10px',
                padding: '10px 0',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '18px',
                width: '50px',
                textAlign: 'center',
            }} />
    );
};

export default SizeInput;