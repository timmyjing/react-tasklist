import React, { Component } from 'react';
import './App.css';
import TaskListContainer from './components/TaskList/TaskListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1>Tasks</h1>
          <TaskListContainer />
        </header> */}
        <TaskListContainer />
      </div>
    );
  }
}

export default App;

