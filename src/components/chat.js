import React from 'react'
import Chatkit from '@pusher/chatkit'

class Chat extends React.Component {

    componentDidMount () {
        const chatMan = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:6953dac6-6667-45b1-b5d5-22f22ebd8d1c',
            userId : this.props.currentUsername,
            tokenProvider : new Chatkit.TokenProvider({
                url : 'http://localhost:3001/authenticate'
            })
        })

        chatMan
            .connect()
            .then(currentUser => console.log('Current User is ', currentUser))
            .catch(error => console.error(error))

    }


    render () {
        return (
            <div>
                <h1>Chat Screen</h1>
                <p>Hello, { this.props.currentUsername }</p>
            </div>
        )
    }
}

export default Chat