import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import csrfDispatcher from './utils/csrfDispatcher';
import httpDispatcher from './utils/httpDispatcher';

class App extends Component {
  state = {
    response: null,
    post: 'example',
    csrfToken: null
  };

  componentDidMount() {
      csrfDispatcher.getCsrfToken()
      .then((res) => {
        this.setState({ csrfToken: res});
      })
      //.catch(err => console.log(err));
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.state.csrfToken
      },
      url: '/api/world',
      data: {post:this.state.post}
    };

    httpDispatcher.processRequest(request)
    .then((response) => {
      this.setState({ responseToPost: response.data });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            CSRF with remote Express Prototype
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>Token: [{this.state.csrfToken}]</p>
        <p>Response from Server: [{this.state.responseToPost}]</p>
      
      </div>
    );
  }
}

export default App;
