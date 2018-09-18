// Main entry point for the app.
// Renders: Login, task Table, logout, and new task button
// Makes inital connection with firebase so that relevant states can get updated 

import React, { Component } from 'react';
import TaskTable from './Components/TaskTable';
import NewTaskForm from './Components/NewTaskForm';
import Login from './Components/Login';
import { Sticky, Icon, Button, Popup } from 'semantic-ui-react';
import { base, app } from './rebase';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notStarted: [],
      inProgress: [],
      completed: [],
      loading: true,
      auth: false,
      users: [],
      uid: '',
    };

    // If user is authenitcated then get data from firebase and update states.
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = app.auth().currentUser.uid;
        this.setState({auth: true, uid: uid});

        this.ref = base.syncState('Users/'+ uid +'/Tasks/Not Started', {
          context: this,
          state: 'notStarted',
          asArray: true,
          then() {
            this.setState({ loading: false });
          }
        });
        this.ref = base.syncState('Users/'+ uid +'/Tasks/In Progress', {
          context: this,
          state: 'inProgress',
          asArray: true,
        });
        this.ref = base.syncState('Users/'+ uid +'/Tasks/Completed', {
          context: this,
          state: 'completed',
          asArray: true,
        });
        this.ref = base.syncState('UserList', {
          context: this,
          state: 'users',
          asArray: true,
        });
      } else {
        this.setState({auth: false, uid: ''});
      }
    });
  }

  //change auth state to false once user logs out
  signOut = () => {
    app.auth().signOut().then(function() {
      this.setState({auth: false});
    }).catch(function(error) {
     console.log(error);
    });
  }

  // main content refers to table of tasks and new task button 
  mainContent = () => {
    const addTaskForm = (
      <NewTaskForm uid={this.state.uid} users={this.state.users}/>
    );
    const newTaskButton = (
      <Button color={'yellow'} circular icon labelPosition='left'>
        <Icon size={'large'} name='plus circle' />
        New Task
      </Button>
    );

    return (
      <div>
        <div className="App-main">
            <TaskTable notStarted= { this.state.notStarted } inProgress= { this.state.inProgress } completed = { this.state.completed } uid={this.state.uid}/>
          </div>
          <div className="App-footer">
            <Sticky>
              <Popup
                trigger={ newTaskButton }
                content={ addTaskForm }
                on='click'
                position='top'
              />

            </Sticky>
        </div>
      </div>
    );
  }

  loginContent = () => {
    return <Login/>;
  }

  render() {
    // if auth state is true then show the main content,
    // other wise show login screen
    const loggedIn = this.state.auth ? this.mainContent() : this.loginContent();
    const signOutButton = (
      <div className="App-header-logout">
        <Button color={'red'} type='submit' onClick={this.signOut}>Logout</Button>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Task Master!</h1>
          {/* if user logged in then show signout button */}
          {
            this.state.auth ? signOutButton : null
          }
        </header>
        { loggedIn }
      </div>
    );
  }
}

export default App;
