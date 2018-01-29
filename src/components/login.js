import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  };

class Login extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="title-app">E/Pro</p>
        <br />

        <TextField
        hintText="example@email.com"
        floatingLabelText="Email Login"
        /><br />

        <TextField
          hintText=""
          floatingLabelText="Password"
          type="password"
        /><br />
         <br />
          <br />

         <RaisedButton label="Register" backgroundColor='#52BFAB' labelColor='white'  style={style}/>

         <RaisedButton label="Login" backgroundColor='#52BFAB' labelColor='white' style={style}/>

      </div>
    )
  }
}


export default Login;
