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
} from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Router>
        <div className="App">

          <MuiThemeProvider>

          <Navbar/>

          <Switch>
            <Route
              exact path="/"
              render= {() => (
                <div>
                  <Hormones/>
                </div>
                )
              }/>
            <Route
              exact path="/login"
              render= {() => (
                <div>
                  <Login/>
                </div>
                )
              }/>

            <Route
            exact path="/account"
            render= {() => (
              <div>
                <Account/>
              </div>
            )}
            />

            <Route
            exact path="/hormones"
            render= {() => (
              <div>
                <Hormones/>
              </div>
            )}
            />

            <Route
            exact path="/userbase"
            render= {() => (
              <div>
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
