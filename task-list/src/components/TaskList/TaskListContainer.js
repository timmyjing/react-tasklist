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
    this.renderGroups = this.renderGroups.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
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

  renderGroups() {
    const { tasks } = this.state;
    // count the type of tasks and how many were completed
    const count = {};

    tasks.forEach( task => {
      if (count[task.group] === undefined ) {
        count[task.group] = {
          count: 1,
          completed: task.completedAt ? 1 : 0,
        };
      } else {
        count[task.group].count++;
        if (task.completedAt) count[task.group].completed++; 
      }
    })

    const groups = Object.keys(count);

    return <TaskGroupsIndex groups={groups} count={count} toggleShow={this.toggleShow}/>;
  }

  renderGroup(group) {
    const allTasks = this.state.tasks;
    const tasks = allTasks.filter( task => task.group === group);
    const byId = {};
    allTasks.forEach( task => byId[task.id] = task)
// have to determine if tasks are completable by dependencies
    console.log(tasks);
    return <TaskGroupList toggleTask={this.toggleTask} tasks={tasks} byId={byId} group={group}/>;
  }

  render() {
    const {showGroup} = this.state;
    return (
      <div>
        {showGroup ? this.renderGroup(showGroup) : this.renderGroups()}
      </div>
    )
  }
}