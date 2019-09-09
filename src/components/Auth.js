import React, { Component } from "react";
import axios from "axios";

export class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      favoriteColor: "",
      favColorAcct: ""
    };
  }

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handleFavoriteColor = e => {
    this.setState({ favoriteColor: e.target.value });
  };

  handleLogin = () => {
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post("/auth/login", body).then(res => {
      this.setState({ favColorAcct: res.data.favoriteColor });
    });
  };

  handleRegister = () => {
    const body = {
      username: this.state.username,
      password: this.state.password,
      favoriteColor: this.state.favoriteColor
    };

    axios.post("/auth/register", body).then(res => {
      this.setState({ favColorAcct: res.data.favoriteColor });
    });
  };

  render() {
    return (
      <div>
        <h2>Your favorite Color is "{this.state.favColorAcct}"</h2>
        <input placeholder="username" onChange={this.handleUsername} />
        <input
          placeholder="password"
          type="password"
          onChange={this.handlePassword}
        />
        <input
          placeholder="fav color  (only if registering)"
          onChange={this.handleFavoriteColor}
        />
        <br></br>
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

export default Auth;
