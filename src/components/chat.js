import React from 'react'
import Chatkit from '@pusher/chatkit'
import Message from './messages'
import SendMsg from './sendMessage'

class Chat extends React.Component {

    constructor () {

        super()

        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {}
        }

        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount () {
        const chatMan = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:6953dac6-6667-45b1-b5d5-22f22ebd8d1c',
            userId : this.props.currentUsername,
            tokenProvider : new Chatkit.TokenProvider({
                url : 'http://localhost:3001/auth'
            })
        })

        chatMan
            .connect()
            // .then(currentUser => console.log('Current User is ', currentUser))
            .then(currentUser => {
                this.setState({
                    currentUser
                })
                currentUser.subscribeToRoom({
                    roomId: 18051962,
                    meesageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom
                })
            })
            .catch(error => console.error(error))

    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    render () {
        return (
            <div>
                <h1>Chat Screen</h1>
                <p>Hello, { this.props.currentUsername }</p>

                <Message messages = { this.state.messages } />

                <SendMsg onSubmit = {this.sendMessage} />
            </div>
        )
    }
}

export default Chat