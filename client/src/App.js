import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: 'example',
    responseToPost: '',
    csrfToken: 'notyet'
  };

  componentDidMount() {
    this.callApi()
      .then((res) => {
        //this.setCookie('_csrf-my-app', res.csrfToken, 365);
        this.setState({ response: res.express, csrfToken: res.csrfToken, documentCookies: document.cookie });
      })
      .catch(err => console.log(err));
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  callApi = async () => {
    const response = await fetch('/api/hello', {
      credentials: "include"
    });
    const body = await response.json();
    this.setState({ serverCookies: response.cookie });
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      credentials: 'include', // <-- includes cookies in the request
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': `'${this.state.csrfToken}'`
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    this.setState({requestHeader: `'CSRF-Token': ${this.state.csrfToken}`});

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
        <p>Server Response: <div dangerouslySetInnerHTML={{__html: this.state.responseToPost}} /></p>
        <p>Token: [{this.state.csrfToken}]</p>
        <p>Request Header: [{this.state.requestHeader}]</p>
        <p>Server Cookies: [{this.state.serverCookies}]</p>
        <p>Document Cookies: [{this.state.documentCookies}]</p>
      </div>
    );
  }
}

export default App;
