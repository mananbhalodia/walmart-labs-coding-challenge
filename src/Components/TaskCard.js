// The taskCard Component renders the tasks and adds logic that controls which 
// progress button (start task, complete, done) to show, and to update the database 
// correctly on button press.

import React, { Component } from 'react';
import { Card, Feed, Button, Icon } from 'semantic-ui-react';
import { base } from '../rebase';

class ProgressCard extends Component {

  // moveTask moves the item from the current 'progress' to the new progress ('newStatus') by updating the database.
  moveTask = (item, uid, progress, newStatus) => {
    base
    .remove('Users/' + uid + '/Tasks/' + progress + '/' + item.key)
    .then(() => {
      base.post('Users/' + uid + '/Tasks/' + newStatus + '/' + item.key, {
        data: {summary: item.summary, created: Date.now(), priority: item.priority}
      }).catch(err => {
        console.log(err);
      });
    })
    .catch(error => {
      console.log(error);
    });
  } 
  //renders the start button for when task is in 'Not Started' state 
  startButton = (progress, item, uid) => {
    return (
      <Button color={'purple'} icon labelPosition='left' size='mini' onClick={ () => this.moveTask(item, uid, progress, "In Progress")}>
        <Icon name='play circle' />
        Start Task
      </Button>
    )
  }

  //renders the complete button for when task is in 'In Progress' state 
  finishButton = (progress, item, uid) => {
    return (
      <Button color={'blue'} icon labelPosition='left' size='mini' onClick={() => this.moveTask(item, uid, progress, "Completed")}>
        <Icon name='fast forward' />
        Complete
      </Button>
    )
  }
  
  //renders the Done button for when task is in 'Compeleted' state 
  completedButton = () => {
    return (
      <Button color={'green'} icon labelPosition='left' size='mini'>
        <Icon name='check circle outline' />
        Done
      </Button>
    )
  }
  
  // decides which button to display
  logicButton = (progress, item, uid) => {
    switch (progress) {
      case "Not Started": 
        return this.startButton(progress, item, uid);
        break;
      case "In Progress":
        return this.finishButton(progress, item, uid);
        break;
      case "Completed":
        return this.completedButton(progress, item, uid);
        break;
  
    }
  }

  priorityLogic = (priority) => {
    switch (priority) {
      case "Low": 
        return <Icon circular size={'large'} color={'black'} name='flag outline' />
        break;
      case "Medium":
        return <Icon circular size={'large'} color={'green'} name='bicycle' />
        break;
      case "High": 
        return <Icon circular size={'large'} color={'yellow'} name='shipping fast' />
        break;
      case "Critical":
        return <Icon circular size={'large'} color={'red'} name='fighter jet' />
        break;
      default:
        return null;
        break;
    }
  }

  render() {
        
    const {
      header, 
      events, 
      uid,
    } = this.props;

    // Renders the actual task that in the card
    const FeedEvent = (progress, item, userID) => {
      return (
        <Feed.Event className= "Task-card-feed-event" id="task-card">
          <div data-tooltip={"Priority: " + item.priority + ". Repeat: " + item.repeat}>
            {
              this.priorityLogic(item.priority)
            }
          </div>
          <Feed.Content>
            <Feed.Date content={ new Date(item.created).toLocaleDateString() } />
            <Feed.Summary>
              { item.summary }
            </Feed.Summary>
          </Feed.Content>
            {
              this.logicButton(progress, item, userID)
            }
        </Feed.Event>
      )
    }

    return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>{header}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              {
                // go through all the events to render the tasks
                events.map(item => {
                  return (
                    FeedEvent (header, item, uid)
                  )
                })
              }
            </Feed>
          </Card.Content>
        </Card>
      )
  }
}
export default ProgressCard