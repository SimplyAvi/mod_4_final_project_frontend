import React from 'react'
import { API_ROOT, HEADERS } from '../constants'

class NewMessageForm extends React.Component {
    // state for items in the new message
    state = {
        text: '',
        conversation_id: this.props.conversation_id,
        allMessages: []
    }

    // had this as component will mount, changed it back to what they had !!!!!!!!!!!!!!
    componentWillReceiveProps = nextProps => {
        this.setState({
            conversation_id: nextProps.conversation_id
        })
    }

    // sets the state for the controlled form
    handleChange = e => {
        this.setState({text: e.target.value})
    }

    // handles the fetch/post to the db 
    handleSubmit = e => {
        
        e.preventDefault();
        fetch(`${API_ROOT}/messages`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(console.log)
            // .then(data => this.setState({
            // allMessages: [...this.state.allMessages, data]
        // }))
        // why does this not need two .thens? 
        // is this because no promises are needed and the data is being taken care of by websockets?
        this.setState({ text: ''})
    }


    render = () => {
        // console.log(this.state.allMessages)
        return (
            <div className="newMessageForm">
                {/* controlled form for handle submit */}
                <form onSubmit={this.handleSubmit}>
            <label> New Message:</label>
            <br />
                    <input
                    type="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    />
                    <input type="submit"/>
                </form>
            </div>

        )
        
    }



}

export default NewMessageForm;