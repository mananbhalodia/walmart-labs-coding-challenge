import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import CardExampleContentBlock from './TaskCard';

const GridExampleDividedNumber = ( {notStarted, inProgress, completed, uid} ) => (
  <Grid columns='equal' >
      <Grid.Column>
        <CardExampleContentBlock header="Not Started" events = { notStarted } uid={uid}/>
      </Grid.Column>
      <Grid.Column>
        <CardExampleContentBlock header="In Progress" events = { inProgress } uid={uid}/>
      </Grid.Column>
      <Grid.Column>
        <CardExampleContentBlock header="Completed" events = { completed } uid={uid}/>
      </Grid.Column>
  </Grid>
) 

export default GridExampleDividedNumber