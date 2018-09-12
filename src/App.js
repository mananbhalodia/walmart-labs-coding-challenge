import React, { Component } from 'react';
import GridExampleDividedNumber from './Components/TaskTable';
import NewTaskForm from './Components/NewTaskForm';
import { Sticky, Icon, Button, Popup } from 'semantic-ui-react';

import './App.css';

class App extends Component {

  render() {
    const tasks = [ {"timeElapsed" : "1 Day", 'summary' : "hello world!"}, {"timeElapsed" : "3 Days", 'summary' : "Wow new task!"} ];
    const newTaskButton = (
      <Button color={'yellow'} circular icon labelPosition='left'>
        <Icon size={'large'} name='plus circle' />
        New Task
      </Button>
    );
    const addTaskForm = (
      <NewTaskForm/>
    )
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Task Master!</h1>
        </header>
        <div className="App-main">
          <GridExampleDividedNumber notStarted= { tasks } inProgress= { tasks } completed = { tasks }/>
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
}

export default App;
