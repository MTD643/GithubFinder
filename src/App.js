import React, { Fragment, useState } from "react";
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

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  //Searches Github Users api for the given text
  const searchUsers = (queryText) => {
    if (queryText) {
      setLoading(true);
      const url = `https://api.github.com/search/users?q=${queryText}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      axios.get(url).then((response) => {
        setLoading(false);
        setUsers(response.data.items);
      });
    }
  }

  //Gets a single Github user
  const getUser = async username => {
    if (username) {
      setLoading(true);
      const url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      const response = await axios.get(url);

      setLoading(false);
      setUser(response.data);
    }
  }

  //Get user repos
  const getUserRepos = async username => {
    if (username) {
      setLoading(true);
      const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

      const response = await axios.get(url);

      setLoading(false);
      setRepos(response.data);
    }
  }

  // Clear users from state
  const clear = () => {
    setUsers([]);
  }

  // Set Alert -- goes away after 2 seconds
  const setAlertMsg = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clear={clear}
                  hasData={users && users.length > 0}
                  setAlert={setAlertMsg}
                />
                <Users
                  users={users}
                  loading={loading}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User
                {...props}
                getUser={getUser}
                user={user}
                loading={loading}
                getUserRepos={getUserRepos}
                repos={repos}
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
