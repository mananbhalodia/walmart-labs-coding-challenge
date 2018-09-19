# Task Master
#### (Walmart Labs Coding Challenge- Replenisher Task List)

This replinsher task list allows employees to keep track of diffrent tasks they have to complete. An employee can either assign themselves a task or assign another employee a task. The tasks have either 4 priority levels (low, medium, high, or critical) and can be set to repeat on certain intervals (hour, day, or week). Once a task has been assigned, the employee can move the task into different progress levels, starting from "Not Started" to "In Progress" and finally to "Completed". 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development, testing purposes or actual use.

### Prerequisites
The following steps assume you have npm (node) and pip installed on your computer.
If not please follow the links ([pip](https://pip.pypa.io/en/stable/installing/), [npm](https://www.npmjs.com/get-npm)) to install them.

### Installing

Make sure to clone this repository before following these steps.

Install all neccessary node dependecies: 

```
npm install
```

Install all neccessary python dependencies:

```
pip install -r requirements.txt 
```
### Setup Private Firebase Instance
This project uses the Firebase Realtime database to store data.
Hooking up you own Firebase instance for this project is easy!
1. Go to the [Firebase](https://firebase.google.com/) website
2. Create a new `Realtime Database` project
3. In your new project go to `project settings` -> `Add Firebase to your web app`
4. `Copy` the following items: `apiKey`, `authDomain`, `databaseURL`, `storageBucket`, `messagingSenderId`
5. Go to `/walmart-labs/src/rebase.js` in your project and `paste` the items into the corresponding fields
6. Done!

## Deployment

To actually use the app, follow these steps:

Start flask server:
```
python flaskServer.py 
```
Server is hosted on [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

Start React app:
```
npm run 
```
Open [http://localhost:3000](http://localhost:3000) to view app.

### API To Interact With App Externally
1. GET all tasks from all users 
`curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/get_all_tasks`
    ```
    {
        User ID:
            {
                Tasks:
                    {
                        All: 
                        {
                            Task ID:
                                {
                                    summary:"Get Boxes", 
                                    priority:"High", 
                                    repeat:"Hour"
                                }, ...
                        },
                        Not Started: {},
                        In Progress: {},
                        Completed: {}
                    }
            }, ...
    }
    ```
2. POST a new task to a user's `Not Started` task list 
`curl -H "Content-type: application/json" -X POST http://127.0.0.1:5000/add_task -d '{"uid":"w2XIBYxSNTdzFJlorOjBSXGO0X52", "task":{"summary":"Get Boxes", "priority":"High", "repeat":"hour"}}'`

    ```
    {"uid":"w2XIBYxSNTdzFJlorOjBSXGO0X52", 
    "task":
        {
        "summary":"Get Boxes", 
        "priority":"High", 
        "repeat":"Hour"
        }
    }
    ```
## Running The Tests

To run the corresponding tests for the project (run in root directory of project):
```
npm test 
```
### Break Down of Unit Tests
###### (Tests for this project were created using [Jest](https://jestjs.io/) and [Enzyme](http://airbnb.io/enzyme/))
The general structure of the unit tests follow the same setup for most cases:
1. Since this is a single page app rendering the main `<App/>` component will suffice.
2. The rendering of most components in the app is dependent upon the content of the `state` so make sure to update the relevant `state` objects.
3. Once `state` contains the appropriate data and `<App/>` is rendered, you can test and interact with the components in question.

```
describe('<App />', () => {
  it('should render main', () => {
    const main = mount(<App />);
    expect(main.find('[id="main"]').length).toBe(1);
  });
```

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Flask](http://flask.pocoo.org/) - Backend server and cron jobs
* [Jest](https://jestjs.io/), [Enzyme](http://airbnb.io/enzyme/)- JS Testing Libraries


## Authors

* **Manan Bhalodia**

## License

This project is licensed under the MIT License.
