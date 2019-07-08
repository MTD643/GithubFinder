import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null,
  };

  searchUsers = (queryText) => {
    debugger;
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

  // Clear users from state
  clear = () => {
    this.setState({
      users: []
    });
  }

  // Set Alert
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
    const { users, loading, alert } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/about' component={About} />
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
                  />
                </Fragment>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
