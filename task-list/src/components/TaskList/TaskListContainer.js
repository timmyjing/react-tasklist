import React from 'react';
import { TASKS } from '../../tasks';
import Completed from '../../Completed.svg';
import Group from '../../Group.svg';
import Locked from '../../Locked.svg';
import Incomplete from '../../Incomplete.svg';


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
  }

  toggleTask(id) {
    const tasks = [...this.state.tasks];

    tasks.forEach(task => {
      if (task.id === id) task.completedAt = !task.completedAt;
    })

    this.setState({tasks});
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

    return (
      <div>
      <h2>Things To Do</h2>
      {groups.map((group, idx) => {
        return <div onClick={() => this.setState({showGroup: group})}>
          <h3>{group}</h3>
          <h3>{count[group].completed} Of {count[group].count} Tasks Complete</h3>
        </div>
      })}
      </div>
    )
  }

  renderGroup(group) {
    const allTasks = this.state.tasks;
    const tasks = allTasks.filter( task => task.group === group);
    const byId = {};
    allTasks.forEach( task => byId[task.id] = task)
// have to determine if tasks are completable by dependencies
    console.log(tasks);
    return (<div>
      <div onClick={() => this.setState({showGroup: false})}>Back to Groups</div>
      <h2>{group}</h2>
      {tasks.map(task => {
        let locked = false;
        task.dependencyIds.forEach( id => {
          if (byId[id].completedAt === null) locked = true;
        })

        return <div onClick={ locked ? null : () => this.toggleTask(task.id)}>
          <img src={locked ? Locked : (task.completedAt ? Completed : Incomplete)} />
          {task.task}
        </div>})}
    </div>)
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