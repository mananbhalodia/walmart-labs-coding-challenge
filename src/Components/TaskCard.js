import React from 'react';
import { Card, Feed, Button, Icon } from 'semantic-ui-react';



const startButton = () => {
  return (
    <Button color={'purple'} icon labelPosition='left' size='mini'>
      <Icon name='play circle' />
      Start Task
    </Button>
  )
}

const finishButton = () => {
  return (
  <Button color={'blue'} icon labelPosition='left' size='mini'>
      <Icon name='fast forward' />
      Complete
    </Button>
  )
}

const completedButton = () => {
  return (
    <Button color={'green'} icon labelPosition='left' size='mini'>
      <Icon name='check circle outline' />
      Done
    </Button>
  )
}

const logicButton = (progress) => {
  switch (progress) {
    case "Not Started": 
      return startButton();
      break;
    case "In Progress":
      return finishButton();
      break;
    case "Completed":
      return completedButton();
      break;

  }
}

const FeedEvent = (timeElapsed, summary, header) => {
  return (
    <Feed.Event className= "Task-card-feed-event">
      <Feed.Content>
        <Feed.Date content={ timeElapsed } />
        <Feed.Summary>
          { summary }
        </Feed.Summary>
        
      </Feed.Content>
        {
          logicButton(header)
        }
    </Feed.Event>
  )
};

const CardExampleContentBlock = ( { header, events }) => (
  <Card fluid={true}>
    <Card.Content>
      <Card.Header>{header}</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        {
          events.map(item => {
            let timeElapsed = item.created;
            let summary = item.summary;
            return (
              FeedEvent (timeElapsed, summary, header)
            )
          })
        }
      </Feed>
    </Card.Content>
  </Card>
)

export default CardExampleContentBlock