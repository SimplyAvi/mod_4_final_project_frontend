import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
// this cable handles the conversations, and deals when a new message is recieved for updating purposes?
const Cable = ({ conversations, handleRecievedMessage }) => {
    return (
        // fragment returns partial info  - should be useful for rerending new data posted onto the DB 
        <Fragment>
            {conversations.map(conversation => {
                // console.log(conversation.id)
                return (
                    // ActionCableConsumer allows you to subscribe to a channel? -the client of the websocket
                    <ActionCableConsumer
                        key={conversation.id}
                        channel={{ channel: 'MessagesChannel',  conversation: conversation.id }}
                        onRecieved={handleRecievedMessage}
                        onConnected={() => console.log('im connected')}
                        />
                )
            })}


        </Fragment>
    )
}

export default Cable;