// Login Component allows user to sign up or login. 
// Uses firebase authentication to add users securely.

import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { base, app } from '../rebase';

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "", 
      password: ""
    };
  }

  // signUp adds new user to firebase auth and adds the user to the UserList table in the database.
  signUp = () => {
    app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      let immediatelyAvailableReference = base.post('UserList/' + user.user.uid, {
        data: {userName: this.state.email},
        then(err){
          if(err){
            console.log(err);
          }
        }
      });
    }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
    })
  }

  // logIn checks if user is valid, and logs user in accordingly
  login = () => {
    app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  render() {
    return (
      <Form className="App-main">
        <Form.Field>
          <label>Email</label>
          <input placeholder='email@email.com' onChange={(e) => this.setState({ email: e.target.value})} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" placeholder='password' onChange={(e) => this.setState({ password: e.target.value})} />
        </Form.Field>
        <Button type='submit' onClick={this.login}>Login</Button>
        <Button type='submit' onClick={this.signUp}>Sign Up</Button>
      </Form>
    );
  }
}

export default Login;