import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: null,
    post: 'example',
    csrfToken: null
  };

  componentDidMount() {
    this.callApi()
      .then((res) => {
        this.setState({ response: res.express, csrfToken: res.csrfToken});
        // this.setState({ response: res.express, csrfToken: 'bogus'});
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello', {
      credentials: "same-origin"
    });
    const body = await response.json();
    if (response.status !== 200) { 
      throw Error(body.message);
    } else {
      return body;
    }    
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      credentials: 'include', // <-- includes cookies in the request
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.state.csrfToken
      },
      body: JSON.stringify({ post: this.state.post }),
    });

    if(response.status === "200") {
      this.setState({ responseToPost: await response.text() });
    }
    else {
      this.setState({ responseToPost: await response.text() });
    }    
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
