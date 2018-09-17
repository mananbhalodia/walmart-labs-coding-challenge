import React from 'react';
import App from './App';
import { shallow, mount, } from 'enzyme';
import { base } from './rebase';

describe('<App />', () => {
  it('should render main', () => {
    const main = shallow(<App />);
    expect(main.find('[id="main"]').length).toBe(1);
  });
  it('should render main title', () => {
    const main = shallow(<App />);
    expect(main.find('[id="main-header"]').text()).toEqual("Welcome to Task Master!");
  });

  describe('When user not logged in', () => {
    it('should render login Component', () => {
      const main = mount(<App />);
      expect(main.find('[id="main-login"]').exists()).toBe(true);
    });
    it('should not render main task table component', () => {
      const main = mount(<App />);
      expect(main.find('[id="main-task-table"]').exists()).toBe(false);
    });
    it('should not render logout button', () => {
      const main = mount(<App />);
      expect(main.find('[id="main-logout-button"]').exists()).toBe(false);
    });
  })

  describe('When logging user in', () => {
    it('should sign user up correctly', () => {
      const main = mount(<App />);
      const login = main.find('[id="main-login"]');
      const email = login.find('[id="main-login-email"]');
      const password = login.find('[id="main-login-password"]');
      expect(main.find('[id="main-login"]').exists()).toBe(true);
      email.find('input').simulate('change', {target: {value: 'mananbhalodia10@gmail.com'}});
      password.find('input').simulate('change', {target: {value: '1475369'}});
      login.find('[id="main-login-signup-button"]').at(1).simulate('click');
    });
  })

  describe('When user is logged in', () => {
    let notStartedState = [];
    beforeEach(() => {
      const uid = "GI15VTSMqigWRWihonXel7qp6dL2";
      base.fetch('Users/'+ uid +'/Tasks/Not Started', {
        context: this,
        asArray: true,
        then(data){
          notStartedState = data;
        }
      });
    });

    it('should show table', () => {
      const main = mount(<App />);
      main.setState({ auth: true })
      const table = main.find('[id="main-task-table"]');
      expect(table.exists()).toBe(true);
    });
    it('should show 1 task in progress', () => {
      const main = mount(<App />);
      main.setState({ auth: true, notStarted: notStartedState })
      const table = main.find('[id="main-task-table"]');
      const notStartedCol = main.find('[id="main-task-table-notStarted-col"]');
      expect(notStartedCol.length).toBe(1);
    });
    it('should show new task button', () => {
      const main = mount(<App />);
      main.setState({ auth: true })
      const newTaskbutton = main.find('[id="main-new-task-button"]');
      expect(newTaskbutton.exists()).toBe(true);
    });
  })
})
