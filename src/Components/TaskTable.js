import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import CardExampleContentBlock from './TaskCard';

const GridExampleDividedNumber = ( {notStarted, inProgress, completed} ) => (
  <Grid columns='equal' >
      <Grid.Column>
        <CardExampleContentBlock header="Not Started" events = { notStarted }/>
      </Grid.Column>
      <Grid.Column>
        <CardExampleContentBlock header="In Progress" events = { inProgress }/>
      </Grid.Column>
      <Grid.Column>
        <CardExampleContentBlock header="Completed" events = { completed }/>
      </Grid.Column>
  </Grid>
) 

export default GridExampleDividedNumber