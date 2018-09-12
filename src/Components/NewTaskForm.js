import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class NewTaskForm extends Component {
  render() {

    return (
      <Form>
        <Form.Field>
          <label>Task</label>
          <input placeholder='Task Description' />
        </Form.Field>
        <Form.Field label='Repeat Every' control='select'>
          <option value='None'>None</option>
          <option value='Hour'>Hour</option>
          <option value='Day'>Day</option>
          <option value='Week'>Week</option>
        </Form.Field>
        <Form.Field label='Priority' control='select'>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
          <option value='Critical'>Critical</option>
        </Form.Field>
        <Form.Field label='Assign To' control='select' disabled>
          <option value='Self'>Self</option>
          <option value='Manan'>Manan</option>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

export default NewTaskForm;