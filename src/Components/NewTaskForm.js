import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { base, app } from '../rebase';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      priority: "",
      repeat: "",
      userID: props.uid,
    };
  }

  addTask = () => {
    const {
      uid
    } = this.props;
    let immediatelyAvailableReference = base.push('Users/' + this.state.userID + '/Tasks/Not Started', {
      data: {summary: this.state.summary, priority: this.state.priority, repeat: this.state.repeat, created: Date.now()},
      then(err){
        if(err){
          console.log(err);
        }
      }
    })
  }
  render() {

    const {
      users,
      uid,
    } = this.props;

    return (
      <Form>
        <Form.Field>
          <label>Task</label>
          <input placeholder='Task Description' onChange={(e) => this.setState({summary: e.target.value})}/>
        </Form.Field>
        <Form.Field label='Repeat Every' control='select' onChange={(e) => this.setState({repeat: e.target.value})}>
          <option value='None'>None</option>
          <option value='Hour'>Hour</option>
          <option value='Day'>Day</option>
          <option value='Week'>Week</option>
        </Form.Field>
        <Form.Field label='Priority' control='select' onChange={(e) => this.setState({priority: e.target.value})}>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
          <option value='Critical'>Critical</option>
        </Form.Field>
        <Form.Field label='Assign To' control='select' onChange={(e) => this.setState({userID: e.target.value})}>
          <option value={uid}>Self</option>
          {
            users.map(user => {
              if (user.key != uid) {
                return <option value={user.key}>{user.userName}</option>
              }
            })
          }
          
        </Form.Field>
        <Button type='submit' onClick={ this.addTask }>Submit</Button>
      </Form>
    );
  }
}

export default NewTaskForm;