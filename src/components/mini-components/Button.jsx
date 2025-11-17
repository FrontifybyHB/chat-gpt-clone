import React from 'react'

const Button = (props) => {
    const { text, onClick } = props
    return (
        <>
            <button type="button" onClick={() => onClick()}>{text}</button>
        </>
    )
}

export default Button
