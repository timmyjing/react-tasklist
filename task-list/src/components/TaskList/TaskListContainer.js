import React from 'react';
import { TASKS } from '../../tasks';
import TaskGroupsIndex from './TaskGroupsIndex';
import TaskGroupList from '../TaskGroupList/TaskGroupList';


export default class TaskListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroup: false,
      tasks: TASKS,
    };
    this.toggleTask = this.toggleTask.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleTask(id) {
    const tasks = [...this.state.tasks];

    tasks.forEach(task => {
      if (task.id === id) task.completedAt = !task.completedAt;
    })

    this.setState({tasks});
  }

  toggleShow(group = false) {
    this.setState({showGroup: group});
  }

  render() {
    const {tasks, showGroup} = this.state;

    return (
      <div className="task-list-container">
        {showGroup ? 
        <TaskGroupList toggleTask={this.toggleTask} allTasks={tasks} group={showGroup} toggleShow={this.toggleShow}/> : 
        <TaskGroupsIndex tasks={tasks} toggleShow={this.toggleShow}/>}
      </div>
    )
  }
}