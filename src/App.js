import React, { Component } from 'react';
import GridExampleDividedNumber from './Components/TaskTable';
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

  componentDidMount() {
  }

  signOut = () => {
    app.auth().signOut().then(function() {
      this.setState({auth: false});
    }).catch(function(error) {
     console.log(error);
    });
  }

  mainContent = () => {
    const addTaskForm = (
      <NewTaskForm uid={this.state.uid} users={this.state.users}/>
    );
    const newTaskButton = (
      <Button id="main-new-task-button" color={'yellow'} circular icon labelPosition='left'>
        <Icon size={'large'} name='plus circle' />
        New Task
      </Button>
    );

    return (
      <div>
        <div className="App-main">
            <GridExampleDividedNumber notStarted= { this.state.notStarted } inProgress= { this.state.inProgress } completed = { this.state.completed } uid={this.state.uid}/>
          </div>
          <div className="App-footer">
            <Sticky>
              <Popup
                trigger={ newTaskButton }
                content={ addTaskForm }
                on='click'
                position='top center'
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
    const loggedIn = this.state.auth ? this.mainContent() : this.loginContent();
    const signOutButton = (
      <div className="App-header-logout">
        <Button id="main-logout-button" color={'red'} type='submit' onClick={this.signOut}>Logout</Button>
      </div>
    );

    return (
      <div className="App" id="main">
        <header className="App-header">
          <h1 className="App-title" id="main-header">Welcome to Task Master!</h1>
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
