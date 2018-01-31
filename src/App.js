import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Account from './components/account.js'
import Hormones from './components/hormones.js'
import Login from './components/login.js'
import Navbar from './components/navbar.js'
import Userbase from './components/userbase.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'loggedIn': false,
      'user': ''
    }
  }

  async componentDidMount() {
    const logged = await this.getAuth()
    if (logged.status === 'success') {
      this.setState({
        loggedIn: true,
        user: logged.data.user_id
      })
    } else {
      localStorage.removeItem('token')
    }
  }
  async getAuth() {
    const response = await fetch('https://epro-api.herokuapp.com/auth/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    const json = await response.json()
    return json
  }


  render() {
    return (
      <Router>
        <div className="App">
          <MuiThemeProvider>
            <Switch>
            <Route
              exact path="/"
              render= {() => (
                <div className = "height-adjust">
                  <Navbar/>
                  <Hormones/>
                </div>
                )
              }/>
            </Switch>
          </MuiThemeProvider>

          <MuiThemeProvider>
            <Switch>
            <Route
              exact path="/login"
              render= {() => (
                <div>
                  <Login/>
                </div>
                )
              }/>
            </Switch>
          </MuiThemeProvider>

          <MuiThemeProvider>
            <Switch>
              <Route
              exact path="/account"
              render= {() => (
                <div>
                  <Account/>
                </div>
              )}
            />
            </Switch>
          </MuiThemeProvider>

          <MuiThemeProvider>
            <Switch>
            <Route
            exact path="/hormones"
            render= {() => (
              <div>
                <Navbar/>
                <Hormones user={this.state.user}/>
              </div>
            )}
            />
          </Switch>
          </MuiThemeProvider>

          <MuiThemeProvider>
            <Switch>
            <Route
            exact path="/userbase"
            render= {() => (
              <div>
                <Navbar/>
                <Userbase/>
              </div>
            )}
            />

          </Switch>
          </MuiThemeProvider>

        </div>
      </Router>
    );
  }
}

export default App;
