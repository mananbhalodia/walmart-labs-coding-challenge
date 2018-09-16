import React, { Component } from 'react';
import { Card, Feed, Button, Icon } from 'semantic-ui-react';
import { base, app } from '../rebase';

class CardExampleContentBlock extends Component {

  moveTask = (item, uid, progress, newStatus) => {
    base
    .remove('Users/' + uid + '/Tasks/' + progress + '/' + item.key)
    .then(() => {
      base.post('Users/' + uid + '/Tasks/' + newStatus + '/' + item.key, {
        data: {summary: item.summary, created: item.created, priority: item.priority}
      }).catch(err => {
        console.log(err);
      });
    })
    .catch(error => {
      console.log(error);
    });
  } 
  startButton = (progress, item, uid) => {
    return (
      <Button color={'purple'} icon labelPosition='left' size='mini' onClick={ () => this.moveTask(item, uid, progress, "In Progress")}>
        <Icon name='play circle' />
        Start Task
      </Button>
    )
  }
  
  finishButton = (progress, item, uid) => {
    return (
      <Button color={'blue'} icon labelPosition='left' size='mini' onClick={() => this.moveTask(item, uid, progress, "Completed")}>
        <Icon name='fast forward' />
        Complete
      </Button>
    )
  }
  
  completedButton = () => {
    return (
      <Button color={'green'} icon labelPosition='left' size='mini'>
        <Icon name='check circle outline' />
        Done
      </Button>
    )
  }
  
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

  render() {
    
    const FeedEvent = (header, item, uid) => {
      return (
        <Feed.Event className= "Task-card-feed-event">
          <Feed.Content>
            <Feed.Date content={ item.created } />
            <Feed.Summary>
              { item.summary }
            </Feed.Summary>
            
          </Feed.Content>
            {
              this.logicButton(header, item, uid)
            }
        </Feed.Event>
      )
    }
    const {
      header, 
      events, 
      uid,
    } = this.props;

    return (

        <Card fluid={true}>
          <Card.Content>
            <Card.Header>{header}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              {
                events.map(item => {
                  console.log(item);
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
export default CardExampleContentBlock