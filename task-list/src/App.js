import React, { Component } from 'react';
import './App.css';
import TaskListContainer from './components/TaskList/TaskListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskListContainer />
      </div>
    );
  }
}

export default App;

