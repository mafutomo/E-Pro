import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './login.css'

import {
  Link,
  Redirect
} from 'react-router-dom'

import Hormones from './hormones'

const style = {
  margin: 12
};




class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      message: '',
      loggedIn: false
    }
  }

  loginUser = async (e, {email, password}) => {
    e.preventDefault()
    const response = await fetch ('https://epro-api.herokuapp.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const logged = await response.json()
    if (logged.auth_token) {
      this.setState({
        token: logged.auth_token,
        message: logged.message,
        loggedIn: true
      })
      localStorage.setItem('token', logged.auth_token)
    } else {
      this.setState({
        message: logged.message
      })
    }
    window.location.reload()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    const {loggedIn} = this.state
    if (loggedIn) {
      return (
        <Redirect to='/hormones' render={()=> (
          <Hormones/>
        )}/>
      )
    }

    return (
      <div className="backgroundImage">
        <img src={require("./homepage.jpg")} className="bg" />
        <p className="title-app">E/Pro</p>
        <form onSubmit={(e)=>{this.loginUser(e, this.state)}} >
        <TextField
        hintText="example@email.com"
        floatingLabelText="Email Login"
        value={this.state.email}
        onChange={this.handleChange}
        name="email"
        /><br />

        <TextField
          hintText=""
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          name="password"
        /><br />
        <br />
        <br />
        <br />


         <RaisedButton label="Login" backgroundColor='#52BFAB' labelColor='white' style={style} type="submit"/>

         <Link to={`/account`}>
         <RaisedButton label="Register" backgroundColor='#FF3E00' labelColor='white'  style={style}/>
       </Link>


       </form>


      </div>
    )
  }
}


export default Login;
