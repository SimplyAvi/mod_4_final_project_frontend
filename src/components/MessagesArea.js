import React from 'react'
import NewMessageForm from './NewMessageForm'

// message area gives the conversation all the details from the input?
// why deconstruct?
const MessagesArea = ({
    conversation: { id, title, messages, allMessages },
    


}) => {
    console.log(allMessages)

    return (
        <div className="messagesArea">
            <h2>{title}</h2>
            <ul>{orderedMessages(messages)}</ul>
            <NewMessageForm conversation_id={id} />
        </div>

    )
 }
     
export default MessagesArea

// helper meathod in order to get the messages in order fromt he date its created 
    const orderedMessages = messages => {
            const sortedMessages = messages.sort(
            (a,b) => Date(a.created_at) - new Date(b.created_at)
            )
            return sortedMessages.map(message => {
                return (
                <li key={message.id}>{message.text}</li>
            )})

    }

