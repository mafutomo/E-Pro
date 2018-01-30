import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  };

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      message: ''
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
        message: logged.message
      })
      localStorage.setItem('token', logged.auth_token)
    } else {
      this.setState({
        message: logged.message
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <p className="title-app">E/Pro</p>
        <br />
        <form onSubmit={(e)=>{this.loginUser(e, this.state)}}>
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


         <RaisedButton label="Login" backgroundColor='#52BFAB' labelColor='white' style={style} type="submit"/>
       </form>
         <RaisedButton label="Register" backgroundColor='#52BFAB' labelColor='white'  style={style}/>
      </div>
    )
  }
}


export default Login;
