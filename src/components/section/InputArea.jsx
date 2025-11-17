import React from 'react'
import Input from '../mini-components/Input'
import Button from '../mini-components/Button'

const InputArea = (props) => {
    return (
        <div className="input-area">
            <Input 
                value={props.value} 
                onChange={props.onChange} 
                sendMesageToLlm={props.sendMesageToLlm} 
                placeholder="Type your message for LLM"
                disabled={props.disabled}
            />
            <Button 
                onClick={props.sendMesageToLlm} 
                text="Send" 
                disabled={props.disabled}
            />
        </div>
    )
}

export default InputArea
