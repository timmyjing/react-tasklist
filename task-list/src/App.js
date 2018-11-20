import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskListContainer from './components/TaskList/TaskListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Tasks</h1>
          <TaskListContainer />
        </header>
      </div>
    );
  }
}

export default App;

