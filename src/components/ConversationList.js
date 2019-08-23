import React from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable'

class ConversationList extends React.Component {
    // state for info being used when dealing with the conversationlist
    state = {
        conversations: [],
        activeConversation: null
    }
    // fetching data to render onto the DOM
    componentDidMount = () => {
        fetch(`${API_ROOT}/conversations`)
            .then(res => res.json())
            .then(conversations => this.setState({
                conversations: conversations
            }))
    }
    // gives the active conversation the id of wh
    handleClick = (id) => {
        this.setState({ activeConversation: id})
    }

    // updates the db/render with the new conversation added to the list of existing conversationlist
    handleRecievedConversation = (resp) => {
        console.log(resp)
        // const { conversation } = resp;
        this.setState({
            conversations: [...this.state.conversations, resp]
        })
    }
    
    // updates the message list for each messages inside of a specific conversation?
    handleRecievedMessage = (resp) => {
        console.log(resp);
        const { message } = resp; 
        const conversations = [...this.state.conversations]
        const conversation = conversations.find( 
            conversation => conversation.id === message.conversation_id
        )
        conversation.messages = [...conversation.messages, message];
        this.setState({conversations})
        
    }
    
    handleNewConversation = (event) => {
        event.preventDefault();
        console.log(event)
        console.log('hi')
    }

    render = () => {
        const { conversations, activeConversation } = this.state;
        return (
            <div className="conversationList">
                <ActionCableConsumer
                    channel={{ channel: 'ConversationsChannel' }}
                    onRecieved={this.handleRecievedConversation}
                />
                
                {this.state.conversations.length ? (
                    <Cable
                        conversations={conversations}
                        handleRecievedMessage={this.handleRecievedMessage}
                    />
                ) : null}
                <h2>Conversations</h2>
                <ul> {mapConversations(conversations, this.handleClick)}</ul>
                
                
                <NewConversationForm handleNewConversation={this.handleNewConversation}/>



              {activeConversation ? (
                    <MessagesArea 
                        conversation={findActiveConversation(
                            conversations,
                            activeConversation
                        )}
                     />     
              ): null}
            </div>

        )
    }
 }
export default ConversationList


// helper method to find the active conversation 
const findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
        conversation => conversation.id === activeConversation
    )
}

// helper method to find the id,title of the conversation
const mapConversations = (conversations, handleClick) => {
    return conversations.map(conversation => {
        return (
            <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
                {conversation.title}
            </li>
        )
    })
}