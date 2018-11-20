## Directions to Start:
npm install
npm start


## Design
This app was created using CreateReactApp. The hierarchy of the components is displayed below.

TaskListContainer - High Level Component
  - TaskGroupList
    - TaskGroupItem
  - TaskGroupDetail
    - TaskItem

The UI state by default shows a list of the different groups of tasks. If a group item is clicked, then the UI state will be changed to show the specific group. This is done to keep things simple and because of the unidirectional data flow, functions from the top level will need be needed to change the state data due to the dependencies. Therefore, the top level component must not be unmounted in order for the task data to persist and to allow the data to be updated and correctly rendered. Functions will handle changing the task completed state and also handle changing the UI state. Clicking the group items will change UI state to display group details. Clicking the back to groups will change UI state to display list of groups.

Something I would address is how to manage a task that is completed but then has one of its dependencies marked incomplete. Should this task with the dependency also reset?

Total Time took about ~4-5 hours to complete.

Answers are provided for questions below.



# PROMPT

This challenge includes three steps: 1. build a front-end react UI for a basic Task List, 2. design a database schema to store the task list data, and 3. document an API for a front-end to talk to the back-end.

SCORING CRITERIA

As an engineering team we focus on clear conventions, best practices, and code quality.
We'll look for clear structure and naming, thoughtful organization of files and components,
and keeping things simple. We're also kind of picky about bugs, so we'll test the react app to
make sure everything aligns to the above criteria.

Please do not write any code for a back-end or anything out of scope of the questions.
Stay focused on front-end react code, API documentation, and database schema.

This is your chance to lay out a project as you think it should be done, so focus on doing it
"the right way" rather than throwing in all the bells and whistles.


1. Build the UI for a grouped task list with task dependencies

* Build a task list UI in React using included design and SVG assets
* The top level should show a list of task groups w/ # of tasks inside
* Clicking a group should display the list of all tasks for that group
* Tasks remain locked until all dependent tasks are complete
* Clicking a task should mark it as complete or incomplete, unless the task is locked
* Keep it simple and focus on building well-designed React components. Don't worry about talking to an API, tests, or state management libraries
* Use the data below to populate the UI

Task Payload to Use for UI:
[
  {
    id: 1,
    group: "Purchases",
    task: "Go to the bank",
    dependencyIds: [],
    completedAt: null,
  },
  {
    id: 2,
    group: "Purchases",
    task: "Buy hammer",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 3,
    group: "Purchases",
    task: "Buy wood",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 4,
    group: "Purchases",
    task: "Buy nails",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 5,
    group: "Purchases",
    task: "Buy paint",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 6,
    group: "Build Airplane",
    task: "Hammer nails into wood",
    dependencyIds: [2, 3, 4],
    completedAt: null,
  },
  {
    id: 7,
    group: "Build Airplane",
    task: "Paint wings",
    dependencyIds: [5, 6],
    completedAt: null,
  },
  {
    id: 8,
    group: "Build Airplane",
    task: "Have a snack",
    dependencyIds: [],
    completedAt: null,
  }
]

2. Design the SQL database schema to store all required task list data.

* Schema should define all tables, columns, and constraints
* Schema should be written in SQL
* Feel free to add any additional commentary as to why certain decisions were made

## Answer
I would need a Users table, a Tasks table along with a table to join them together. There will be a User has many tasks relationship in order to store Tasks under a certain user. The Tasks table would have the columns ID, Group, Task, CompletedAt. Task dependencies will be managed by a self joining table which joins Tasks to Tasks. A task will have a has many relationship to tasks in order to manage dependencies and to normalize the data. Another constraint is to only allow users to create tasks for themselves and add dependencies to tasks they've created. Tasks will be looked up by the user and then joined with the Task Dependencies table in order to get the dependency IDs for each task. This will take care of the problem of having to search for more and more nested dependencies.

Schema
```
CREATE TABLE Users {
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
}

CREATE TABLE Tasks (
  id INT NOT NULL PRIMARY KEY,
  group VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  completed timestamp NULL,
  created timestamp DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL FOREIGN KEY REFERENCES Users(id)
);

CREATE TABLE TaskDependencies {
  id INT NOT NULL PRIMARY KEY,
  task_id INT NOT NULL,
  dependency_id INT NOT NULL
}
```

Notes: Null is allowed on the completed column in order to undo a task and to signify that it is not completed.


3. Document an HTTP API for checking and unchecking a Task

* API should only be documented, no need to implement anything in code
* Include URL, request payload format, and response payload format for success and errors
* No need to get fancy w/ formatting or overly descriptive
* Don’t feel constrained by the payload in question 1 - design what you think is a good API

## Answer
The API endpoint for checking and unchecking a task will be /tasks/:id and would accept a PATCH HTTP method. In order to update
a task, include the id into the endpoint and pass a payload with the completion timestamp if completing a task or null if 
unchecking a task. The task must also be registered under the current user or else access will be denied. Upon success, a response with the task id and the updated completion time will be sent as a payload. If there is a failure, an error status will be provided in the payload along with a descriptive message.

Sample Request Payload for unchecking a task: { completedAt: null }.

Sample Successful Response Payload for unchecking a task: { id: 1, completedAt: null }.

Sample Error Response Payload { status: 400, message: 'Cannot complete task due to dependency' } or {status: 403, message: 'Task does not belong to current user'}.
