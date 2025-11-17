const Input = (props) => {
    const { placeholder, value, onChange, sendMesageToLlm, disabled } = props
    return (
        <>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                disabled={disabled}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !disabled) {
                        sendMesageToLlm()
                    }
                }}
            />
        </>
    )
}

export default Input
