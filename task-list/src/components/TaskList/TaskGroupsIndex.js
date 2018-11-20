import React from 'react';
import TaskGroupItem from './TaskGroupItem';


const TaskGroupsIndex = ({tasks, toggleShow}) => {

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
      <div className="task-group">
        <h1>Things To Do</h1>
      </div>
      {groups.map( (group,idx) => <TaskGroupItem group={group} key={idx} count={count[group]} toggleShow={toggleShow} />)}
    </div>)
};

export default TaskGroupsIndex;