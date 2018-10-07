import React, { Component } from 'react'
import User from './components/createUser'
import Chat from './components/chat'
import './App.css';

class App extends Component {

  constructor() {
      super()

      this.state = {
          currentScreen : 'inputUser',
          currentUsername : '',
          errorMsg : ''
      }

      this.onUserSubmit = this.onUserSubmit.bind(this)
  }

  onUserSubmit(username) {
      fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
      }).then(response => {

          console.log(response.status);

          if (response.status !== 400 && response.status !== 404) {
            console.log('success')
            this.setState({
                currentUsername : username,
                currentScreen : 'Chat'
            })
          } 
      }).catch(error => {
          console.log(error)
      })
  }

  render() {

    if (this.state.currentScreen === 'inputUser') {
      return (<div>
        <h1>Aasra App</h1>
        <User onSubmit={this.onUserSubmit} />
      </div>)
    } else if (this.state.currentScreen === 'Chat') {
      return (<Chat currentUsername = {this.state.currentUsername} /> )
    }
  }
}

export default App;
