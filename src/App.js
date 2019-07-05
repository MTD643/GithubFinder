import React, { Component } from "react";
import "./App.css";
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';

class App extends Component {

  state = {
    users: [],
    loading: false,
  };

  searchUsers = (queryText) => {
    if (queryText) {
      const url = `https://api.github.com/search/users?q=${queryText}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      axios.get(url).then((response) => {
        this.setState(
          {
            users: response.data.items
          })
      });
    }
  }

  clear = () => {
    this.setState({
      users: []
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clear={this.clear}
            hasData={this.state.users && this.state.users.length > 0}
          />
          <Users
            users={this.state.users}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default App;
