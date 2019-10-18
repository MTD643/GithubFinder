import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';

class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };

  //Searches Github Users api for the given text
  searchUsers = (queryText) => {
    if (queryText) {
      this.setState({ loading: true });
      const url = `https://api.github.com/search/users?q=${queryText}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      axios.get(url).then((response) => {
        this.setState(
          {
            loading: false,
            users: response.data.items
          })
      });
    }
  }

  //Gets a single Github user
  getUser = async username => {
    if (username) {
      this.setState({ loading: true });
      const url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      const response = await axios.get(url);

      this.setState(
        {
          loading: false,
          user: response.data
        })
    }
  }

  //Get user repos
  getUserRepos = async username => {
    if (username) {
      this.setState({ loading: true });
      const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      const response = await axios.get(url);

      this.setState(
        {
          loading: false,
          repos: response.data
        })
    }
  }

  // Clear users from state
  clear = () => {
    this.setState({
      users: []
    });
  }

  // Set Alert -- goes away after 2 seconds
  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 2000);
  }

  render() {
    const { users, loading, alert, user, repos } = this.state;

    return (
      <GithubState>

        <Router>
          <div className="App">
            <Navbar title="Github Finder" />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clear={this.clear}
                      hasData={users && users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users
                      users={users}
                      loading={loading}
                      getUser={this.getUser}
                      getUserRepos={this.getUserRepos}
                    />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                  />
                )} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    );
  }
}

export default App;
