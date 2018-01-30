import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import '../index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'

import Hormones from './hormones'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      token: '',
      message: ''
    }
  }

  logout = async () => {
    const r = await fetch(`https://epro-api.herokuapp.com/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    const logged = await r.json()
    this.setState({
      token: logged.auth_token,
      message: logged.message
    })
    localStorage.removeItem('token')
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
          <div>

              <AppBar
                  style={{backgroundColor:'#484043'}}
                  onClick={this.handleToggle}
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  className="navbar-style"
              />

              <Drawer

                  docked={false}
                  width={200}
                  open={this.state.open}
                  onRequestChange={(open) => this.setState({open})}>

                <Link to={`/hormones`} style={{textDecoration: 'none'}}>
                  <MenuItem
                  style={{fontFamily: 'Julius Sans One'}}
                  onClick={this.handleClose}>Your Cycle</MenuItem>
                </Link>

                {/* <Link to={`/account`} style={{textDecoration: 'none'}}>
                <MenuItem style={{fontFamily: 'Julius Sans One'}}
                onClick={this.handleClose}>Account</MenuItem>
                </Link> */}

                <Link to={`/userbase`} style={{textDecoration: 'none'}}>
                <MenuItem style={{fontFamily: 'Julius Sans One'}}
                onClick={this.handleClose}>User Base</MenuItem>
                </Link>

                <Link to={`/login`} style={{textDecoration: 'none'}}>
                <MenuItem style={{fontFamily: 'Julius Sans One'}} onClick={()=>{this.logout()}}>Logout</MenuItem>
                </Link>

              </Drawer>
            </div>

      )
  }
}


export default Navbar;
