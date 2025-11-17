import React from 'react'

const Messages = (props) => {
  const { messages } = props
  return (
    <div className="messages">
      {messages.filter(message => message.role !== "system").map((message, idx) =>{
        return (
          <div className={`message ${message.role}`} key={idx}>
            <p>{message.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
