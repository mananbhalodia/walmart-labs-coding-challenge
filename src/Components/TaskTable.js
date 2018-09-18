// Table compoent that has three columns for three different progresses. 
// Tasks get passed in to the columns and passed again to the taskCard component.
// A header prop also gets passed so that we know what progress the task is at currently and the next
// progress to move it to.

import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProgressCard from './TaskCard';

const TaskTable = ( {notStarted, inProgress, completed, uid} ) => (
  <Grid columns='equal' >
      <Grid.Column>
        <ProgressCard header="Not Started" events = { notStarted } uid={uid}/>
      </Grid.Column>
      <Grid.Column>
        <ProgressCard header="In Progress" events = { inProgress } uid={uid}/>
      </Grid.Column>
      <Grid.Column>
        <ProgressCard header="Completed" events = { completed } uid={uid}/>
      </Grid.Column>
  </Grid>
) 

export default TaskTable