import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
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
      open: false
    }
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

                <Link to={`/hormones`}>
                  <MenuItem style={{fontFamily: 'Julius Sans One'}} >Home</MenuItem>
                </Link>

                <Link to={`/account`}>
                <MenuItem style={{fontFamily: 'Julius Sans One'}}>Account</MenuItem>
                </Link>

                <Link to={`/userbase`}>
                <MenuItem style={{fontFamily: 'Julius Sans One'}}>User Base</MenuItem>
                </Link>


                <Link to={`/login`}>
                <MenuItem style={{fontFamily: 'Julius Sans One'}}>Logout</MenuItem>
                </Link>

              </Drawer>
            </div>

      )
  }
}


export default Navbar;
