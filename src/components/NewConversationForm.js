import React from 'react'
import { API_ROOT, HEADERS } from '../constants'

class NewConversationForm extends React.Component{
    // state for new conversation title
    state = {
        title: ''
    }
    // setting the state for the title given from the form
    handleChange = e => {
        this.setState({ title: e.target.value })
    }
    // handles the submit of the form, posting it to the DB, WHERE DOES THIS RERENDER???
    handleSubmit = e => {
        e.preventDefault();
        fetch(`${API_ROOT}/conversations`, {
            method: 'POST',
            headers: HEADERS, 
            body: JSON.stringify(this.state)
        })
    }
    
    render = () => {
        return (
            <div className="newConversationForm">
                {/* has a form for inputting the new channel */}
                <form onSubmit={this.handleSubmit} >
                    <label>  New Conversation: </label>
                    <br/>
                    <input
                        type='text'
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <input type="submit" />
                </form>

            </div>
        )
    }

}

export default NewConversationForm;