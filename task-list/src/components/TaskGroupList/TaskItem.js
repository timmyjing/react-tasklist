import React from 'react';
import Locked from '../../Locked.svg';
import Incomplete from '../../Incomplete.svg';
import Completed from '../../Completed.svg';

const TaskItem = ({task, toggleTask, byId}) => {

  const completedStyle = {textDecoration: 'line-through'};
  const lockedStyle = {color: 'grey'};
  
  let locked = false;
  task.dependencyIds.forEach( id => {
    if (!byId[id].completedAt) locked = true;
  })

  return (
  <div className="task-item" onClick={ locked ? null : () => toggleTask(task.id)}>
    <img src={locked ? Locked : (task.completedAt ? Completed : Incomplete)} />
    <h3 className="left-align" style={locked ? lockedStyle : ( task.completedAt ? completedStyle : null)}>{task.task}</h3>
  </div>);
}

export default TaskItem;